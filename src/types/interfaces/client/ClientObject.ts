import UserObject from '../user/UserObject';
import ClientOptions from './ClientOptions';
import ClientSocketOptions from './ClientSocketOptions';
import ApplicationObject from './ApplicationObject';
import GuildManager from '../../managers/GuildManager';
import Logger from '../../../Util/Log';

/// <reference path="./typings/node/node.d.ts" />
import { EventEmitter } from 'events';

interface ClientObject extends EventEmitter {
    options: ClientOptions;
    token: string;
    ws: ClientSocketOptions;
    user: UserObject;
    guilds: Map<string, GuildManager>;
    _Logger: Logger;
    application: ApplicationObject;
}

export default ClientObject;