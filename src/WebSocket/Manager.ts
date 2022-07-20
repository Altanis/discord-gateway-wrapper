import DiscordSocket from "./helpers/DiscordSocket";
import GatewayErrorHandler from "./helpers/GatewayErrorHandler";
import { GATEWAY_URI, INCOMING_PACKETS, OUTGOING_PACKETS } from '../types/enums/Packets';
import Logger from '../Util/Log';
import { EventEmitter } from 'events';
import ClientOptions from "../types/interfaces/client/ClientOptions";
import ClientSocketOptions from "../types/interfaces/client/ClientSocketOptions";
import UserObject from "../types/interfaces/user/UserObject";
import GuildManager from "../types/managers/GuildManager";

class Client extends EventEmitter {
    options: ClientOptions;
    token: string;
    ws: ClientSocketOptions;
    user: UserObject | {};
    guilds: Map<string, typeof GuildManager>;
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
        this.guilds = new Map();

        this._Logger = new Logger(this.options?.debug || false);
    }

    _onmessage(message: any) {
        console.log(message);

        const { t: event, s: sequence, d: data, op: header } = message;
        this.ws.heartbeat.sequence = sequence;

        switch (header) {
            case INCOMING_PACKETS.EVENT_DISPATCH: { // Events such as READY and GUILD_CREATE are dispatched here.
                require(`./helpers/events/${event}`)(this, event, data);
                break;
            }
            case INCOMING_PACKETS.HELLO: {
                const { heartbeat_interval } = data;
                this.ws.heartbeat.interval = heartbeat_interval * Math.random();
                
                setInterval(() => {
                    this.ws.socket.send({ op: OUTGOING_PACKETS.HEARTBEAT_SEND, s: this.ws.heartbeat.sequence, });
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

    _onerror(message: string) {
        this.ws.socket.ready ?
            this._Logger.warn(`Error during socket connection: ${message}.`)
            :
            this._Logger.severe(`Error during socket connection: ${message}.`);
    }

    _onclose(opcode: number) {
        this._Logger.warn(`Error code ${opcode} thrown on SOCKET_CLOSE event. Reason: ${GatewayErrorHandler(opcode)}.`);
        this._reconnect();
    }

    _reconnect() {
        this._Logger.warn('Reconnecting with Discord API...');
        this.login(true);
    }

    login(reconnect = false) {
        this.ws.socket = new DiscordSocket(GATEWAY_URI);
        this.ws.socket.reconnect = reconnect;

        this.ws.socket.on('open', () => {
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

module.exports = { Client };