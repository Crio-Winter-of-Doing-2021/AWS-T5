import { checkStatus } from '@AWSscheduler/checkStatus';

async function cancelTest() {
    await checkStatus('1')
    .then(res => console.log(res))
    .catch(err => console.error(err));
}
cancelTest();