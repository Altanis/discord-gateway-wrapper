import WebSocket from 'ws';

class DiscordSocket extends WebSocket {
    ready: boolean;
    reconnect: boolean;
    _send: Function;

    constructor(url: string, protocol?: Array<string | null>) {
        super(url, protocol);

        this.ready = false;
        this.reconnect = false;

        this._send = this.send;
        this.send = function(data) {
            if (typeof data !== 'string') data = JSON.stringify(data);
            return this._send.call(this, data);
        }

        this.on('message', function(message) {
            if (typeof message === 'string') message = JSON.parse(message);
            this.emit('decodedMessage', message);
        });
    }
}

export default DiscordSocket;