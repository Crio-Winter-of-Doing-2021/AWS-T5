import assert from "assert";
import * as AWScredentialsJSON from "./.AWSCredentials-secrets.json" ;
/*
    Sample .AWSCredentials-secrets.json
    {
        "accessKeyID": "<string>",                                      
        "secretAccessKey": "<string>"
    }
*/

// Load the SDK and view the APIs offered
import AWS from "aws-sdk";
import { Lambda } from  "@aws-sdk/client-lambda";
// console.log(Object.getOwnPropertyNames(Lambda.prototype)); 

const AWScredentials: any = new AWS.Credentials(AWScredentialsJSON.accessKeyID, AWScredentialsJSON.secretAccessKey);

function parseLambdaARN(ARN: string) {
    try {
        // https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
        var ARNComponents: string[] = ARN.split(":");
        assert(( ARNComponents.length == 7 || ARNComponents.length == 8 ) && ARNComponents[0] == "arn" && ARNComponents[1] == "aws" && ARNComponents[2] == "lambda" && ARNComponents[5] == "function");
        var region: string = ARNComponents[3];
        var accountID: string = ARNComponents[4]; // might need for validating credentials
        var functionName: string = ARNComponents[6];
        var qualifier: string = "";
        if (ARNComponents.length == 8) {
            qualifier = ARNComponents[7];
        } else if (functionName.includes("/")) {
            qualifier = functionName.split("/")[1];
            functionName = functionName.split("/")[0];
        }
        var retComponents: any = {
            "region": region,
            "accountID": accountID,
            "functionName": functionName,
            "qualifier": qualifier,
        };
        return retComponents;
    } catch {
        console.error("ARN not suitably parsed");
    }
}

function invokeLambda(ARN: string, Payload: string) {
    try {
        var parsedARN = parseLambdaARN(ARN);
        
        const lambda = new Lambda({
            apiVersion: '2015-03-31',
            region: parsedARN["region"],
            credentials: AWScredentials,
        })

        var invokeParams: any = {
            FunctionName: parsedARN["functionName"], // Add ARN qualifier here as well
            InvocationType: "Event", // For Async Calls
            Payload: Payload,
        };

        if (parsedARN["qualifier"] != "") {
            invokeParams["Qualifier"] = parsedARN["qualifier"];
        }

        lambda.invoke(invokeParams, function(err, data) {
            if (err) {
                console.error(err, err.stack); // an error occurred
            } else {
                console.log(data);           // successful response
            }
        });
    } catch {
        console.error("The Lambda Function was not invoked properly.");
    }
}

export { invokeLambda }