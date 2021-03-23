import {latestTask} from '@AWSscheduler/latestTask';
import {scheduleJob, RecurrenceRule} from 'node-schedule';
import {editStatus} from '@dbops/editTask';

async function runTask() : Promise<void> {
    latestTask()
    .then(res => {
        const latest = res;
        const time = new Date(latest.invoke_time);
        const rule = new RecurrenceRule();
        rule.date = time.getDate();
        rule.month = time.getMonth();
        rule.year = time.getFullYear();
        rule.hour = time.getHours();
        rule.minute = time.getMinutes();
        rule.second = time.getSeconds();
        // console.log(rule);

        scheduleJob(rule, function () {

            try {
                // await editStatus(latest.id, 'Running');
                console.log('Job running .. URL = ' + latest.urlorarn);
                // await editStatus(latest.id, 'Completed');
            }
            catch(err) {
                editStatus(latest.id, 'Failed');
                console.log("Error : " + err);
            }
        });   
    });
}

runTask();

export {runTask};