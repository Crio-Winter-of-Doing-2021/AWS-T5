import { triggerLambda } from "../../AWSconnect/triggerLambdaHTTP";
const triggerdata= {
    id : "1",
    urlorarn : "https://sbe5rde8ug.execute-api.us-east-1.amazonaws.com/default/aaa",
    payload : "{}"
}
triggerLambda(triggerdata);
// Any Response Code, means the test has been passed. 
// Current URL has been removed as a trigger. Might respond 500.
// Ensure Open Access to a valid URL.