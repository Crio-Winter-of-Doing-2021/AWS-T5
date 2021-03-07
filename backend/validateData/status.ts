function statusValidate(status: string) {
    try {
        // https://learn.crio.do/home/me/ME_CWOD_AWS_TASK/ME_CWOD_AWS_TASK_MODULE_BASIC
        const availableStatus: string[] = ["Scheduled", "Running", "Completed", "Failed", "Cancelled"];
        if (availableStatus.indexOf(status) != -1) {
            return true;
        } else {
            return false;
        }
    } catch {
        console.error("Status Validation Error !");
    }
}

export { statusValidate }