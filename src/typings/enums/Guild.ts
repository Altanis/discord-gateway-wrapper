enum MessageNotificationLevel { 
    AllMessages = 0,
    OnlyMentions = 1,
}

enum ContentFilterLevel {
    Disabled = 0,
    MembersWithoutRoles = 1,
    AllMembers = 2,
}

enum MFALevel {
    None = 0,
    Elevated = 1,
}

enum VerificationLevel {
    None = 0,
    Low = 1,
    Medium = 2,
    High = 3,
    VeryHigh = 4,
}

enum NSFWLevel {
    Default = 0,
    Explicit = 1,
    Safe = 2,
    AgeRestricted = 3,
}

enum PremiumTier {
    None = 0,
    Tier1 = 1,
    Tier2 = 2,
    Tier3 = 3,
}

enum Notifications {
    SupressJoinNotifications = 1 << 0,
    SuppressServerBoostNotifications = 1 << 1,
    SuppressServerSetupNotifications = 1 << 2,
    SuppressJoinStickerNotifications = 1 << 3,
}

export default { MessageNotificationLevel, ContentFilterLevel, MFALevel, VerificationLevel, NSFWLevel, PremiumTier, Notifications };