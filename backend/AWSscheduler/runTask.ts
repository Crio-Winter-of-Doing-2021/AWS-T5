import {latestTask} from './latestTask';
import {scheduleJob,cancelJob,RecurrenceRule} from 'node-schedule';
import {editStatus} from './../dbops/editTask';



async function runTask() {
    const latest = await latestTask();
    const time= new Date(latest.invoke_time);
    const rule=new RecurrenceRule();
    rule.date=time.getDate();
    rule.month=time.getMonth();
    rule.year=time.getFullYear();
    rule.hour = time.getHours();
    rule.minute = time.getMinutes();
    rule.second = time.getSeconds();
    console.log(time);

    const job = scheduleJob(rule,async () => {
        try {
            await editStatus(latest.id,'Running');
            console.log('Job running .. URL = '+latest.urlorarn);
            await editStatus(latest.id,'Completed');
        }
        catch(err) {
            editStatus(latest.id,'Failed');
            console.log("Error : "+err);
        }
    });
    
}
runTask();

export {runTask};