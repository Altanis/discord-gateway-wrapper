import GuildCreateOptions from "../../../typings/interfaces/guild/GuildCreateOptions";
import GuildObject from "../../../typings/interfaces/guild/GuildObject";
import RequestHeaders from "../../../typings/interfaces/http/RequestHeaders";
import GuildManager from "../../../typings/managers/GuildManager";
import Cluster from "../../../typings/structs/Cluster";
import RESTManager from "../REST";

class GuildCacheSystem {
    headers: RequestHeaders;
    REST: RESTManager;
    cache: Cluster<string, GuildManager>;

    constructor(headers: RequestHeaders) {
        this.headers = headers;
        this.REST = new RESTManager(headers);
        this.cache = new Cluster();
    }

    create(options: GuildCreateOptions) {
        const data: any = options;

        data.verification_level = options.verificationLevel;
        delete data.verificationLevel;
        data.default_message_notifications = options.defaultMessageNotifications;
        delete data.defaultMessageNotifications;
        data.explicit_content_filter = options.explicitContentFilter;
        delete data.explicitContentFilter;
        data.afk_channel_id = options.afkChannelID;
        delete data.afkChannelID;
        data.afk_timeout = options.afkTimeout;
        delete data.afkTimeout;
        data.system_channel_id = options.systemChannelID;
        delete data.systemChannelID;
        data.system_channel_flags = options.systemChannelFlags;
        delete data.systemChannelFlags;

        return new Promise((resolve, reject) => {
            this.REST.post('/guilds', data)
                .then(data => { 
                    const guild = new GuildManager(data);
                    this.cache.set(data.id, guild);
                    resolve(guild);
                })
                .catch(error => reject(`[RESTAPIERROR] [${error.code}]: ${error.message}.`));
        });
    }

    fetch(id: string) {
        return new Promise((resolve, reject) => {
            this.REST.get(`/guilds/${id}`)
            .then(data => { 
                const guild = new GuildManager(data);
                this.cache.set(data.id, guild);
                resolve(guild);
            })
            .catch(error => reject(`[RESTAPIERROR] [${error.code}]: ${error.message}.`));
        });
    }

    async edit(property) {
    }
}

export default GuildCacheSystem;