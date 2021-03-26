import { taskByID } from "../../dbops/taskById";
taskByID("2")
.then(res => console.log(res))
.catch(err => console.error(err));