import { ChannelType } from "../enums/Channel";
import ChannelObject from "../interfaces/channel/ChannelObject";

class ChannelManager { 
    id: string;
    type: string;
    name: string | null;
    topic: string | null;
    nsfw: boolean | null;

    constructor(channel: ChannelObject) {
        this.id = channel.id;
        this.type = ChannelType[channel.type]; 
        // this.guild = RESTManager.cache.guilds.get(channel.guild_id);
        this.name = channel.name || null;
        this.topic = channel.topic || null;
        this.nsfw = channel.nsfw || null;
    }
}

export default ChannelManager;