module.exports = {
    GatewayErrorHandler: code => {
        switch (code) {
            case 4000: 
                return 'Gateway has been closed for an unknown reason.';
            case 4001:
                return 'Invalid OP_CODE.';
            case 4002:
                return 'Invalid packet was sent, and could not be parsed by server.';
            case 4003:
                return 'You were not authorized when sending a packet.';
            case 4004:
                return 'Invalid token in OP_CODE 2.';
            case 4005:
                return 'Sent OP_CODE 2 more than once.';
            case 4007:
                return 'Sequence was incorrect when resuming a connection.';
            case 4008:
                return 'Ratelimit was reached.';
            case 4009:
                return 'Session was timed out due to not sending OP_CODE 1 in time.';
            case 4010:
                return 'Invalid shard received.';
            case 4011:
                return 'Too many servers on one shard.';
            case 4012:
                return 'API Version being attempted to connect to is discontinued.';
            case 4013:
                return 'Invalid intent.';
            case 4014:
                return 'Intent required was not specified.';
        }
    }
};