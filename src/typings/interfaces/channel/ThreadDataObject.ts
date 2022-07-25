interface ThreadDataObject {
    archived: boolean;
    auto_archive_duration: number;
    archive_timestamp: number;
    locked: boolean;
    invitable?: boolean;
    create_timestamp?: number;
}

export default ThreadDataObject;