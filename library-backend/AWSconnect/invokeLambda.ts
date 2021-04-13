/**
 * FOR ARN passing, requires Credentials for invocation, 
 * and in the process stores AWS credentials on Your local DB.
 * But saves the hassle and dangers of an Open HTTP Trigger. 
*/


// Load the SDK and view the APIs offered
import * as AWS  from "aws-sdk";
import { Lambda } from  "@aws-sdk/client-lambda";
// console.log(Object.getOwnPropertyNames(Lambda.prototype)); 
import * as fs from "fs";

import {accessKeyIDValidate} from '../validateData/accessKeyID'

function parseLambdaARN(ARN: string) {
    try {
        // https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
        const ARNComponents: string[] = ARN.split(":");
        // console.log(process.cwd())
        if(( ARNComponents.length == 7 || ARNComponents.length == 8 ) && ARNComponents[0] == "arn" && ARNComponents[1] == "aws" && ARNComponents[2] == "lambda" && ARNComponents[5] == "function") {
            const region: string = ARNComponents[3];
            const accountID: string = ARNComponents[4]; // might need for validating credentials
            let functionName: string = ARNComponents[6];
            let qualifier = "";
            if (ARNComponents.length == 8) {
                qualifier = ARNComponents[7];
            } else if (functionName.includes("/")) {
                qualifier = functionName.split("/")[1];
                functionName = functionName.split("/")[0];
            }
            const retComponents = {
                "region": region,
                "accountID": accountID,
                "functionName": functionName,
                "qualifier": qualifier,
            };
            return retComponents;
        } else {
            return {
                "region": "",
                "accountID": "",
                "functionName": "",
                "qualifier": "",
            };
        }
    } catch {
        console.error("ARN not suitably parsed");
        return {
            "region": "",
            "accountID": "",
            "functionName": "",
            "qualifier": "",
        };
    }
}

function invokeLambda(ARN: string, Payload: string, accessKeyID: string, secretAccessKey: string ) {
    try {
        if (accessKeyIDValidate(accessKeyID)) {
            const invokeSuccessPath = "../invokeSuccess.txt";
            // https://docs.aws.amazon.com/IAM/latest/APIReference/API_AccessKey.html
            const AWScredentials = new AWS.Credentials(accessKeyID, secretAccessKey);
            const parsedARN = parseLambdaARN(ARN);

            const lambda = new Lambda({
                apiVersion: '2015-03-31',
                region: parsedARN["region"],
                credentials: AWScredentials,
            })

            const invokeParams: any = {
                FunctionName: parsedARN["functionName"], // Add ARN qualifier here as well
                InvocationType: "Event", // For Async Calls
                Payload: Payload,
            };

            if (parsedARN["qualifier"] != "") {
                invokeParams["Qualifier"] = parsedARN["qualifier"];
            }

            lambda.invoke(invokeParams, function(err:unknown, data:unknown) {
                if (err) {
                    fs.writeFileSync(invokeSuccessPath, "error");         // an error occurred
                } 
                if (data) {
                    fs.writeFileSync(invokeSuccessPath, "success");     // successful response
                }
            });
        } else {
            console.error("Invalid Access ID")
        }
    } catch {
        console.error("The Lambda Function was not invoked properly.");
    }
}

export { invokeLambda }