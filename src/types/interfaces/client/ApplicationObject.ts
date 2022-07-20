import TeamMemberObject from "../team/TeamMemberObject";
import UserObject from "../user/UserObject";

interface ApplicationObject {
    id: string;
    name: string;
    icon: string | null;
    description: string;
    rpc_origins?: Array<string>;
    bot_public: boolean;
    bot_require_code_grant: boolean;
    owner?: UserObject;
    verify_key: string;
    team: Array<TeamMemberObject> | null;
    guild_id?: string;
    primary_sku_id?: string;
    slug?: string;
    cover_image?: string;
    flags?: number;
    tags?: Array<string>;
    install_params?: {
        scopes: Array<string>;
        permissions: string;
    }
    custom_install_url?: string;
}

export default ApplicationObject;