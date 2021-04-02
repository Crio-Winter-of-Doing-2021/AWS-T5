function accessKeyIDValidate(accessKeyID: string) : boolean | void {
    try {
        // https://docs.aws.amazon.com/IAM/latest/APIReference/API_AccessKey.html
        const pattern = /^[\w]{16,128}$/;
        if (pattern.test(accessKeyID)) {
            return true;
        } else {
            return false;
        }
    } catch {
        console.error("accessKeyID Validation Error !");
    }
}

export { accessKeyIDValidate }