import TeamMemberObject from './TeamMemberObject';

interface TeamObject {
    icon: string | null;
    id: string;
    members: Array<TeamMemberObject>;
    name: string;
    owner_user_id: string;
}

export default TeamObject;