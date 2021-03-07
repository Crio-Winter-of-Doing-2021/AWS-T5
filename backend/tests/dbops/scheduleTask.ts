import { scheduleTask } from "../../dbops/scheduleTask";
scheduleTask("someurl", "2008-09-22T14:01:54.9571247Z")
.then(res => console.log(res))
.catch(err => console.error(err)); 
// timestamp or url is not neccesarily valid as of now. No data validations.