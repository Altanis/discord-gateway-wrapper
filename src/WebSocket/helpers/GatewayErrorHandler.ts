export default (code: number) => {
    switch (code) {
        case 4000: 
            return [1, 'Gateway has been closed for an unknown reason.'];
        case 4001:
            return [0, 'Invalid OP_CODE.'];
        case 4002:
            return [0, 'Invalid packet was sent, and could not be parsed by server.'];
        case 4003:
            return [0, 'You were not authorized when sending a packet.'];
        case 4004:
            return [0, 'Invalid token in OP_CODE 2.'];
        case 4005:
            return [0, 'Sent OP_CODE 2 more than once.'];
        case 4007:
            return [0, 'Sequence was incorrect when resuming a connection.'];
        case 4008:
            return [0, 'Ratelimit was reached.'];
        case 4009:
            return [1, 'Session was timed out due to not sending OP_CODE 1 in time.'];
        case 4010:
            return [0, 'Invalid shard received.'];
        case 4011:
            return [0, 'Too many servers on one shard.'];
        case 4012:
            return [0, 'API Version being attempted to connect to is discontinued.'];
        case 4013:
            return [0, 'Invalid intent.'];
        case 4014:
            return [0, 'Intent required was not specified.'];
        default:
            return [0, 'Unknown error code.'];
    }
};