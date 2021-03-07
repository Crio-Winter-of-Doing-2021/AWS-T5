function accessKeyIDValidate(accessKeyID: string) {
    try {
        // https://docs.aws.amazon.com/IAM/latest/APIReference/API_AccessKey.html
        var pattern: RegExp = /^[\w]{16,128}$/;
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