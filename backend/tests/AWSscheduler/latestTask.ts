import { latestTask } from '../../AWSscheduler/latestTask';

async function latestTaskTest() {
    await latestTask()
    .then(res => console.log(res))
    .catch(err => console.error(err));
}
latestTaskTest();