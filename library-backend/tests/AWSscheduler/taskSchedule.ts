import {taskSchedule} from '../../AWSscheduler/taskSchedule';

async function triggerTest() {
    await taskSchedule('http://api.plos.org/search?q=title:DNA', 100000)
    .then(res => console.log(res))
    .catch(err => console.error(err));
}
triggerTest();