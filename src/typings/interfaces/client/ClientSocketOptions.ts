import DiscordSocket from '../../../WebSocket/helpers/DiscordSocket';

interface ClientSocketOptions {
    socket: DiscordSocket | null;
    heartbeat: {
        ping: number | null;
        interval: number | null;
        sequence: number | null;
        sessionID: string | null;
    };
    version: number | null;
}

export default ClientSocketOptions;