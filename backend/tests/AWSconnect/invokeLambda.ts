import AWSLambdaScheduler from '../../AWSLambdaScheduler';
const Scheduler = new AWSLambdaScheduler();
const invokedata= {
    ARN : "arn:aws:lambda:us-east-2:977476:function:hello-test",
    Payload : "",
    accessKeyID : "accessKeyID",
    secretAccessKey : "secretAccessKey"
}
Scheduler.invokeLambda(invokedata);
// Check for a Resource Not Found. To test properly, plug in the Keys.