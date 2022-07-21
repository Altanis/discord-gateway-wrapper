import GuildObject from '../interfaces/guild/GuildObject';
import Cluster from '../structs/Cluster';
import EmojiManager from './EmojiManager';
import RoleManager from './RoleManager';

class GuildManager {
    id: string;
    name: string;
    ownerID: string;
    roles: Cluster<string, RoleManager>;
    emojis: Cluster<string, EmojiManager>

    constructor(guild: GuildObject) {
        this.id = guild.id;
        this.name = guild.name;
        this.ownerID = guild.owner_id;
        // this.owner = new UserManager(this.ownerID); << Implement later
        this.roles = new Cluster();
        this.emojis = new Cluster();

        guild.roles.forEach(role => this.roles.set(role.id, new RoleManager(role)));
        guild.emojis.forEach(emoji => this.emojis.set(emoji.id, new EmojiManager(emoji)));
    }
}

export default GuildManager;