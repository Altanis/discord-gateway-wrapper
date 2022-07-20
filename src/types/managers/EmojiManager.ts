import EmojiObject from "../interfaces/guild/EmojiObject";
import UserObject from "../interfaces/user/UserObject";

class EmojiManager {
    id: string;
    name: string | null;
    roles: Array<string> | null;
    createdBy: UserObject | null;
    managed: boolean | null;
    animated: boolean | null; 
    available: boolean | null; 

    constructor(emoji: EmojiObject) {
        this.id = emoji.id;
        this.name = emoji.name;
        this.roles = emoji.roles || null;
        this.createdBy = emoji.user || null;
        this.managed = emoji.managed || null;
        this.animated = emoji.animated || null;
        this.available = emoji.available || null;
    }
}

export default EmojiManager;