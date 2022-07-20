const { WebSocketClient } = require('./src/WebSocket/Manager');
const client = new WebSocketClient({
    debug: true,
    token: 'urtokenhere',  
});

client.login();