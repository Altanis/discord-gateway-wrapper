interface RoleObject {
    id: string;
    name: string;
    color: number;
    hoist: boolean;
    icon?: string | null;
    unicode_emoji?: string | null;
    position: number;
    permissions: string;
    managed: boolean;
    mentionabale: boolean;
    tags?: {
        bot_id?: string;
        integration_id?: string;
        premium_subscriber?: null;
    };
}

export default RoleObject;