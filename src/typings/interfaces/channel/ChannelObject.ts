import UserObject from "../user/UserObject";
import ChannelOverwrite from "./ChannelOverwrite";
import ThreadDataObject from "./ThreadDataObject";
import ThreadMemberObject from "./ThreadMemberObject";

interface ChannelObject {
    id: string;
    type: number;
    guild_id?: string;
    position?: number;
    permission_overwrites: Array<ChannelOverwrite>;
    name?: string | null;
    topic?: string | null;
    nsfw?: boolean;
    last_message_id?: string | null;
    bitrate?: number;
    user_limit?: number;
    rate_limit_per_user?: number;
    recipients?: Array<UserObject>;
    icon?: string | null;
    owner_id?: string;
    application_id?: string;
    parent_id?: string | null;
    last_pin_timestamp?: number | null;
    rtc_region?: string | null;
    video_quality_mode?: number;
    message_count?: number;
    member_count?: number;
    thread_metadata?: ThreadDataObject;
    member?: ThreadMemberObject;
    default_auto_archive_duration?: number;
    permissions?: string;
    flags?: number;
    total_messsage_sent?: number;
}

export default ChannelObject;