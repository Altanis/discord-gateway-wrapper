# Discord Gateway Wrapper

_This wrapper is being made solely out of my boredom. Feel free to use it, however I have no 100% guarantee to maintain this project._


<p>This is currently <b>not</b> an NPM package, so you must manually clone this to your desktop and manually compile the TypeScript files.<br>
    An example of using this wrapper would be:
</p>

```js
const { Client } = require('./lib/WebSocket/Manager'); // Import the Client class, the way you will communicate to the Discord API.
const client = new Client({ debug: true, token: 'your token' }); // Instantiate a new client class, placing the token to your bot/user account. The debug property is for logging lower level functions, such as the raw HTTP and WebSocket requests.

client.login(); // Logs in via the Discord API using the token provided.
client.on('ready', function() { // Emits the ready event when the Discord API gives us information about us, the client.
    console.log('Ping', client.ws.heartbeat.ping); // Logs the latency of the connection between the client and Discord API.
    console.log('User', client.user); // Returns the User object of the client.
    console.log('Guilds', client.guilds); // Returns a Map, GuildID => GuildManager.
});
```

## Updates to Come
### More Structures

[ ] Some crucial structures, like Member and Channel have not been implemented yet.
[x] For Client ease, Map will be replaced with an extension, Cluster. This will have methods such as .first and .find.

### HTTP Requests
<p>The client communicates to the Discord API via a REST HTTP Protocol. There are specific endpoints for doing specific actions (such as sending messages, creating channels, etc.)<br>
As of right now, there are no HTTP requests implemented in this wrapper. After creating some crucial structures, HTTP Requests will be worked on.
</p>
