import { checkTaskStatus } from "../../dbops/checkTaskStatus";
checkTaskStatus("10")
.then(res => console.log(res))
.catch(err => console.error(err));