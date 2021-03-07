import AWSLambdaScheduler from '../../AWSLambdaScheduler';
const Scheduler = new AWSLambdaScheduler();
let triggerdata= {
    triggerURL : "https://znhvn9olqk.execute-api.us-east-2.amazonaws.com/default/hello-test",
    payloadData : {}
}
Scheduler.triggerLambda(triggerdata);
// Any Response Code, means the test has been passed. 
// Current URL has been removed as a trigger. Might respond 500.
// Ensure Open Access to a valid URL.