import UserObject from "../user/UserObject";

interface TeamMemberObject {
    membership_state: number;
    permissions: Array<string>; // as of 7/20/2022, always ["*"]
    team_id: string;
    user: UserObject;
}

export default TeamMemberObject;