import { retrieveTaskInstances } from "@AWSscheduler/retrieveTaskInstances"

retrieveTaskInstances("Cancelled")
.then(res => console.log(res))
.catch(err => console.error(err))