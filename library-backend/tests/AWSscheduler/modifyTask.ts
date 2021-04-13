import { modifyTaskStatus, modifyTaskTime } from '../../AWSscheduler/modifyTask';

async function modifyStatusTest(id: string, status: string) : Promise<void>{
    await modifyTaskStatus(id, status)
    .then(res => console.log(res))
    .catch(err => console.error(err));
}
modifyStatusTest("2", "Failed");

async function modifyTimeTest(id: string, timestamp: number) : Promise<void>{
    await modifyTaskTime(id, timestamp)
    .then(res => console.log(res))
    .catch(err => console.error(err));
}
modifyTimeTest("2", 10000);