import ApplicationObject from '../client/ApplicationObject';
import UserObject from '../user/UserObject';
import GuildObject from '../guild/GuildObject';

interface ReadyPayload {
    v: number;
    user: UserObject;
    guilds: Array<GuildObject>;
    session_id: string;
    shard?: Array<number>;
    application: ApplicationObject;      
}

export default ReadyPayload;