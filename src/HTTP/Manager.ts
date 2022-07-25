import RequestHeaders from "../typings/interfaces/http/RequestHeaders";
import GuildCacheSystem from "./helpers/CacheSystem/GuildCacheSystem";

class CacheManager {
    headers: RequestHeaders;
    guilds: GuildCacheSystem;

    constructor(headers: RequestHeaders) {
        this.headers = headers;
        
        this.guilds = new GuildCacheSystem(headers);
    }
}

export default CacheManager;