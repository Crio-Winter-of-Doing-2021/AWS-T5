import { triggerURLValidate } from "../../validateData/triggerURL";
console.log(triggerURLValidate("h;ert90=42"));
console.log(triggerURLValidate("https://www.google.com")); // not enabled for amazonaws.com specific cases
console.log(triggerURLValidate("https://znhvn9olqk.execute-api.us-east-2.amazonaws.com/default/hello-test"));
console.log(triggerURLValidate("znhvn9olqk.execute-api.us-east-2.amazonaws.com/default/hello-test"));
console.log(triggerURLValidate("http://znhvn9olqk.execute-api.us-east-2.amazonaws.com/default/hello-test"));