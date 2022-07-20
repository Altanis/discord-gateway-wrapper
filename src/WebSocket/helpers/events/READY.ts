import ClientObject from "../../../types/interfaces/client/ClientObject";
import ReadyPayload from "../../../types/interfaces/events/READY";
import GuildManager from "../../../types/managers/GuildManager";

export default (manager: ClientObject, data: ReadyPayload) => {
    const { v: version, user, guilds, session_id: sessionID, shard: [id, amount], application } = data;

    manager.ws.version = version; 
    manager.user = user;

    guilds.forEach(guild => {
        manager.guilds.set(guild.id, new GuildManager(guild));
    });

    manager.ws.heartbeat.sessionID = sessionID;
    if (amount) manager._Logger.debug(`Connected to shard ${id}/${amount}.`);
    manager.application = application;  

    manager.emit('ready');
}