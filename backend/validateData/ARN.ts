function ARNValidate(ARN: string) {
    try {
        // https://docs.aws.amazon.com/lambda/latest/dg/lambda-api-permissions-ref.html
        let ARNComponents: string[] = ARN.split(":");
        if (( ARNComponents.length == 7 || ARNComponents.length == 8 ) && ARNComponents[0] == "arn" && ARNComponents[1] == "aws" && ARNComponents[2] == "lambda" && ARNComponents[5] == "function") {
            return true;
        } else {
            return false;
        }
    } catch {
        console.error("ARN Validation Error !");
    }
}

export { ARNValidate }