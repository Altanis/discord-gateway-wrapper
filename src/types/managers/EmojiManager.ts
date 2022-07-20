import EmojiObject from "../interfaces/guild/EmojiObject";
import UserObject from "../interfaces/user/UserObject";

class EmojiManager {
    id: string | null;
    name: string | null;
    roles: Array<string> | null;
    createdBy: UserObject | null;
    managed: boolean | null;
    animated: boolean | null; 
    available: boolean | null; 

    constructor(emoji: EmojiObject) {
        this.id = emoji.id;
        this.name = emoji.name;
        this.roles = emoji.roles;
        this.createdBy = emoji.user;
        this.managed = emoji.managed;
        this.animated = emoji.animated;
        this.available = emoji.available;
    }
}

export default EmojiManager;