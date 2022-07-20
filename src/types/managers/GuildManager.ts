import GuildObject from '../interfaces/guild/GuildObject';
import EmojiManager from './EmojiManager';
import RoleManager from './RoleManager';

class GuildManager {
    id: string;
    name: string;
    ownerID: string;
    roles: Map<string, RoleManager>;
    emojis: Map<string, EmojiManager>

    constructor(guild: GuildObject) {
        this.id = guild.id;
        this.name = guild.name;
        this.ownerID = guild.owner_id;
        // this.owner = new UserManager(this.ownerID); << Implement later
        this.roles = new Map();
        this.emojis = new Map();

        guild.roles.forEach(role => this.roles.set(role.id, new RoleManager(role)));
        guild.emojis.forEach(emoji => this.emojis.set(emoji.id, new EmojiManager(emoji)));
    }
}

export default GuildManager;