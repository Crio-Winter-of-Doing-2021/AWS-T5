import { editInvokeTime, editStatus } from "../../dbops/editTask";

editInvokeTime("10", "2008-09-22T14:01:54.9571247Z")
.then(res => console.log(res))
.catch(err => console.error(err));

editStatus("10", "Cancelled")
.then(res => console.log(res))
.catch(err => console.error(err));