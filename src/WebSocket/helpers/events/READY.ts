import ClientObject from "../../../typings/interfaces/client/ClientObject";
import ReadyPayload from "../../../typings/interfaces/events/READY";
import GuildManager from "../../../typings/managers/GuildManager";
import UserManager from "../../../typings/managers/UserManager";

export default (manager: ClientObject, data: ReadyPayload) => {
    const { v: version, user, guilds, session_id: sessionID, shard, application } = data;

    manager.ws.version = version; 
    manager.user = new UserManager(user);

    guilds.forEach(guild => {
        manager.guilds.set(guild.id, new GuildManager(guild));
    });

    manager.ws.heartbeat.sessionID = sessionID;
    if (shard && shard[0] && shard[1]) manager._Logger.debug(`Connected to shard ${shard[0]}/${shard[1]}.`);
    manager.application = application;  

    manager.emit('ready');
}