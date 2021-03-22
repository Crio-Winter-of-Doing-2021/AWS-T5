import {taskSchedule} from '../../AWSscheduler/taskSchedule';

async function triggerTest() {
    await taskSchedule('www.facebook.com', 100000)
    .then(res => console.log(res))
    .catch(err => console.error(err));
}
triggerTest();