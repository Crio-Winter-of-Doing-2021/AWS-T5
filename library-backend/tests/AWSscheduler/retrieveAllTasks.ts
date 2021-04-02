import { retrieveAllTasks } from "../../AWSscheduler/retrieveAllTasks"

retrieveAllTasks()
.then(res => console.log(res))
.catch(err => console.error(err));