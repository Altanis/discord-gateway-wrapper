import DiscordSocket from '../../../WebSocket/helpers/DiscordSocket';

interface ClientSocketOptions {
    socket: DiscordSocket;
    heartbeat: {
        ping: number;
        interval: number;
        sequence: number;
        sessionID: string;
    };
    version: number;
}

export default ClientSocketOptions;