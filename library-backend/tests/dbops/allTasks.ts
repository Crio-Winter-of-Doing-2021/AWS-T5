import { allTasks } from "../../dbops/allTasks";
allTasks()
.then(res => console.log(res))
.catch(err => console.error(err));