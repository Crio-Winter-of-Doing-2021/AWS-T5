import {taskSchedule} from '../../AWSscheduler/taskSchedule';

async function triggerTest() {
    await taskSchedule('https://sbe5rde8ug.execute-api.us-east-1.amazonaws.com/default/aaa', 10000, "scheduler 1")
    .then(res => console.log(res))
    .catch(err => console.error(err));
}
triggerTest();