function timestampValidate(timestamp: string) {
    try {
        // ISO 8601 validation
        const pattern: RegExp = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d*Z$/;
        if (pattern.test(timestamp)) {
            const providedTime: Date = new Date(timestamp);
            const now: Date = new Date();
            const timeDifference: number = providedTime.getTime() - now.getTime();
            if (timeDifference >= 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch {
        console.error("Timestamp Validation Error !");
    }
}

export { timestampValidate }