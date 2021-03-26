import { tasksByStatus } from "../../dbops/tasksByStatus";
tasksByStatus("Scheduled")
.then(res => console.log(res))
.catch(err => console.error(err));