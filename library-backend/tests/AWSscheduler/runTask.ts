import { runTask } from '../../AWSscheduler/runTask'
import { latestTask } from '../../dbops/latestTask'
runTask('4')
.then(res => {
    latestTask()
    .then(res => console.log(res))
    .catch(err => console.error(err));
});
