import { Client } from "../../../WebSocket/Manager";

interface ClientEvents {
    ready: () => void;
}

export default ClientEvents;