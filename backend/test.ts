import {taskSchedule} from './AWSscheduler/taskSchedule';

async function hello() {
    let id=await taskSchedule('www.facebook.com','2021-03-13T20:04:02.9571247Z');
    console.log(id);
}
hello();