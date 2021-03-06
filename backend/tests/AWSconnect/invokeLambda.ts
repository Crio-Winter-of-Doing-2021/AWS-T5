import { invokeLambda } from "../../AWSconnect/invokeLambda";
invokeLambda("arn:aws:lambda:us-east-2:977476:function:hello-test", "", "accessKeyID", "secretAccessKey");
// Check for a Resource Not Found. To test properly, plug in the Keys.