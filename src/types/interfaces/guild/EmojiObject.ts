import UserObject from "../user/UserObject";

interface EmojiObject {
    id: string;
    name: string | null; 
    roles?: Array<string>;
    user?: UserObject;
    require_colons?: boolean;
    managed?: boolean;
    animated?: boolean;
    available?: boolean;
}

export default EmojiObject;