import {taskSchedule} from '../../AWSscheduler/taskSchedule';

async function triggerTest() {
    await taskSchedule('www.facebook.com', '2025-04-13T20:04:02.957Z')
    .then(res => console.log(res))
    .catch(err => console.error(err));
}
triggerTest();