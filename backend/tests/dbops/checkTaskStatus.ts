import { checkTaskStatus } from "../../dbops/checkTaskStatus";
checkTaskStatus("19")
.then(res => console.log(res))
.catch(err => console.error(err));