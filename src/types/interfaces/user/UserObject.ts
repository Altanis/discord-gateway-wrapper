interface UserObject {
    id: string;
    username: string;
    discriminator: string;
    avatar: string | null;
    bot: boolean;
    system: boolean; // Unused
    mfa_enabled: boolean;
    banner: string | null;
    accent_color: string | null;
    locale?: string;
    verified?: boolean;
    email: string | null;
    flags: number;
    premium_type: number;
    public_flags: number;
}

export default UserObject;