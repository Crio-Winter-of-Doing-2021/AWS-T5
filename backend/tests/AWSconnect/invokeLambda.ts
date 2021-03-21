import { invokeLambda } from '../../AWSconnect/invokeLambda';
const invokedata= {
    ARN : "arn:aws:lambda:us-east-2:977476:function:hello-test/1",
    Payload : "",
    accessKeyID : "accessKeyMake16OrMoreID",
    secretAccessKey : "secretAccessKey"
}
invokeLambda(invokedata.ARN, invokedata.Payload, invokedata.accessKeyID, invokedata.secretAccessKey);
// Check for a Resource Not Found. To test properly, plug in the Keys.