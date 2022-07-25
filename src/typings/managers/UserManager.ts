import UserObject from '../interfaces/user/UserObject';
import AvatarObject from '../interfaces/user/AvatarObject';

class UserManager {
    id: string;
    username: string;
    discrim: string;
    tag: string;
    avatar: AvatarObject;
    bot: boolean;

    constructor(user: UserObject) {
        this.id = user.id;
        this.username = user.username;
        this.discrim = user.discriminator;
        this.tag = `${this.username}#${this.discrim}`;
        this.avatar = {
            hash: user.avatar || null,
            url: user.avatar ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp` : null,
        };
        this.bot = user.bot;
    }
}

export default UserManager;