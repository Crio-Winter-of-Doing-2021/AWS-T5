import { cancelTask } from '@AWSscheduler/cancelTask';

async function cancelTest() {
    await cancelTask('1')
    .then(res => console.log(res))
    .catch(err => console.error(err));
}
cancelTest();