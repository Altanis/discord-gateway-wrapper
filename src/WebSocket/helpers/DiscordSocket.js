const WebSocket = require('ws');

const DiscordSocket = class extends WebSocket {
    constructor(url, protocol) {
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

module.exports = { DiscordSocket };