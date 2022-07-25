import ChannelObject from "../channel/ChannelObject";
import RoleObject from "./RoleObject";

interface GuildCreateOptions {
    name: string;
    region?: string | null;
    icon?: string;
    verificationLevel?: number;
    defaultMessageNotifications?: number;
    explicitContentFilter?: number;
    roles?: Array<RoleObject>;
    channels?: Array<ChannelObject>;
    afkChannelID?: string;
    afkTimeout?: number;
    systemChannelID?: string;
    systemChannelFlags?: number;
}

export default GuildCreateOptions;

/*
    let blob = await fetch("https://cdn.discordapp.com/attachments/988157716780441600/999772528039968859/unknown.png").then(r => r.blob());
    let dataUrl = await new Promise(resolve => {
      let reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
    // now do something with `dataUrl`
*/