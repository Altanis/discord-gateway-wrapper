import RoleObject from "../interfaces/guild/RoleObject";
import AvatarObject from "../interfaces/user/AvatarObject";

class RoleManager {
    id: string;
    name: string;
    color: number;
    hoisted: boolean;
    icon: AvatarObject;
    position: number;
    managed: boolean;
    mentionable: boolean;

    constructor(role: RoleObject) {
        this.id = role.id;
        this.name = role.name;
        this.color = role.color;
        this.hoisted = role.hoist;
        this.icon = {
            hash: role.icon,
            url: role.icon ? `https://discord.com/assets/${role.icon}.svg` : null,
        };
        this.position = role.position;
        this.managed = role.managed;
        this.mentionable = role.mentionabale;
    }
}

export default RoleManager;