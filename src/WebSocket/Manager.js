const { DiscordSocket } = require('./Helpers/DiscordSocket');
const  { GatewayErrorHandler } = require('./helpers/GatewayErrorHandler');
const { GATEWAY_URI, INCOMING_PACKETS, OUTGOING_PACKETS } = require('./helpers/Packet');
const { Logger } = require('../Util/Log');

const WebSocketClient = class {
    constructor(options) {
        this.options = options;
        this.token = options.token;
        this.ws = {
            socket: null,
            heartbeat: {
                ping: null,
                interval: null,
                sequence: null,
                socketID: null,
            }
        }

        this._Logger = new Logger(this.options?.debug || false);
    }

    _onmessage(message) {
        console.log(message);

        const { t: event, s: sequence, d: data, op: header } = message;
        this.ws.heartbeat.sequence = sequence;

        switch (header) {
            case INCOMING_PACKETS.EVENT_DISPATCH: { // Events such as READY and GUILD_CREATE are dispatched here.
                break;
            }
            case INCOMING_PACKETS.READY: {
                const { heartbeat_interval } = data;
                this.ws.heartbeat.interval = heartbeat_interval * Math.random();
                
                setInterval(() => {
                    this.ws.socket.send({ op: OUTGOING_PACKETS.HEARTBEAT_SEND, s: this.ws.heartbeat.sequence, });
                }, this.ws.heartbeat.interval || (45000 * Math.random()));

                this.ws.socket.send({
                    op: OUTGOING_PACKETS.AUTHORIZE,
                    d: {
                        token: this.token,
                        capabilities: 509,
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

    _onerror(message) {
        this.ws.socket.ready ?
            this._Logger.warn(`Error during socket connection: ${message}.`)
            :
            this._Logger.severe(`Error during socket connection: ${message}.`);
    }

    _onclose(opcode) {
        this._Logger.warn(`Error code ${opcode} thrown on SOCKET_CLOSE event. Reason: ${GatewayErrorHandler(opcode)}.`);
        this._reconnect();
    }

    _reconnect(reason) {
        this._Logger.warn('Reconnecting with Discord API...');
        this.login(true);
    }

    login(reconnect = false) {
        this.ws.socket = new DiscordSocket(GATEWAY_URI);
        this.ws.socket.reconnect = reconnect;

        this.ws.socket.on('open', () => {
            this.ws.socket.ready = true;

            if (this.ws.socket.reconnect && this.ws.socket.sessionID) {
                this.ws.socket.send({
                    op: OUTGOING_PACKETS.RESUME_CONNECTION,
                    d: {
                        token: this.token,
                        session_id: this.ws.socket.sessionID,
                        seq: this.ws.heartbeat.sequence,
                    }
                })
            }

            this._Logger.debug('Opened WebSocket with Discord API.');

            this.ws.socket.on('decodedMessage', msg => this._onmessage(msg));
            this.ws.socket.on('close', close => this._onclose(close));
            this.ws.socket.on('error', error => this._onerror(error));
        });
    }
}

module.exports = { WebSocketClient };