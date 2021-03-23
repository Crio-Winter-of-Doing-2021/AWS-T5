import { triggerLambda } from "@AWSconnect/triggerLambdaHTTP";
const triggerdata= {
    triggerURL : "https://znhvn9olqk.execute-api.us-east-2.amazonaws.com/default/hello-test",
    payloadData : {}
}
triggerLambda(triggerdata.triggerURL, triggerdata.payloadData);
// Any Response Code, means the test has been passed. 
// Current URL has been removed as a trigger. Might respond 500.
// Ensure Open Access to a valid URL.