import DiscordSocket from "./helpers/DiscordSocket";
import GatewayErrorHandler from "./helpers/GatewayErrorHandler";
import { GATEWAY_URI, INCOMING_PACKETS, OUTGOING_PACKETS } from '../typings/enums/Packets';
import Logger from '../Util/Log';
import { TypedEmitter } from 'tiny-typed-emitter';
import ClientOptions from "../typings/interfaces/client/ClientOptions";
import ClientSocketOptions from "../typings/interfaces/client/ClientSocketOptions";
import GuildManager from "../typings/managers/GuildManager";
import Cluster from "../typings/structs/Cluster";
import ClientEvents from "../typings/interfaces/client/ClientEvents";
import UserManager from "../typings/managers/UserManager";

class Client extends TypedEmitter<ClientEvents> {
    options: ClientOptions;
    token: string;
    ws: ClientSocketOptions;
    user: UserManager | {};
    guilds: Cluster<string, GuildManager>;
    private _Logger: Logger;

    constructor(options: ClientOptions) {
        super();

        this.options = options;
        this.token = options.token;
        this.ws = {
            socket: null,
            heartbeat: {
                ping: null,
                interval: null,
                sequence: null,
                sessionID: null,
            },
            version: null,
        };

        this.user = {};
        this.guilds = new Cluster();

        this._Logger = new Logger(this.options?.debug || false);
    }

    private _onmessage(message: any) {
        if (!this.ws.socket) return;
        
        const { t: event, s: sequence, d: data, op: header } = message;
        this.ws.heartbeat.sequence = sequence;

        switch (header) {
            case INCOMING_PACKETS.EVENT_DISPATCH: { // Events such as READY and GUILD_CREATE are dispatched here.
                import(`./helpers/events/${event}`).then(EventHandler => {
                    EventHandler.default(this, data);
                });
                break;
            }
            case INCOMING_PACKETS.HELLO: {
                const { heartbeat_interval } = data;
                this.ws.heartbeat.interval = heartbeat_interval * Math.random();
                
                setInterval(() => {
                    this.ws.socket?.send({ op: OUTGOING_PACKETS.HEARTBEAT_SEND, s: this.ws.heartbeat.sequence, });
                }, this.ws.heartbeat.interval || (45000 * Math.random()));

                this.ws.socket.send({
                    op: OUTGOING_PACKETS.AUTHORIZE,
                    d: {
                        token: this.token,
                        properties: {
                            os: 'temple',
                            browser: 'ecosia',
                            device: 'refrigerator',
                        },
                    }
                });
                break;
            }
        }
    }

    private _onerror(message: string) {
        if (!this.ws.socket) return;

        this.ws.socket.ready ?
            this._Logger.warn(`Error during socket connection: ${message}.`)
            :
            this._Logger.severe(`Error during socket connection: ${message}.`);
    }

    private _onclose(opcode: number) {
        const [retry, reason] = GatewayErrorHandler(opcode);

        if (retry) {
            this._Logger.warn(`Error code ${opcode} thrown on SOCKET_CLOSE event. Reason: ${reason}`);
            this._reconnect();
        } else {
            this._Logger.severe(`Error code ${opcode} was thrown on SOCKET_CLOSE event. Reason: ${reason}`);
        }
    }

    private _reconnect() {
        this._Logger.warn('Reconnecting with Discord API...');
        this.login(true);
    }

    login(reconnect = false) {
        this.ws.socket = new DiscordSocket(GATEWAY_URI);
        this.ws.socket.reconnect = reconnect;

        this.ws.socket.on('open', () => {
            if (!this.ws.socket) return;

            this.ws.socket.ready = true;

            if (this.ws.socket.reconnect && this.ws.heartbeat.sessionID) {
                this.ws.socket.send({
                    op: OUTGOING_PACKETS.RESUME_CONNECTION,
                    d: {
                        token: this.token,
                        session_id: this.ws.heartbeat.sessionID,
                        seq: this.ws.heartbeat.sequence,
                    }
                })
            }

            this._Logger.debug('Opened WebSocket with Discord API.');

            this.ws.socket.on('decodedMessage', (msg: MessageEvent) => this._onmessage(msg));
            this.ws.socket.on('close', (close: number) => this._onclose(close));
            this.ws.socket.on('error', (error: string) => this._onerror(error));
        });
    }
}

export { Client };