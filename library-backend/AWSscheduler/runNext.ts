import { latestTask } from '../dbops/latestTask'
import { runTask } from './runTask'

async function runNext(endTime: number) : Promise<void> {
    await latestTask()
    .then( res => {
        if (res.length > 0) {
            const task = res[0];
            const msTime = task.invoke_time.getTime();
            console.log(task);
            if (msTime <= endTime) {
                runTask(task.id.toString())
                .then(res => runNext(endTime))
                .catch(err => console.error(err));
            }
        } else {
            console.error("No latest task");
            return process.exit(0);
        }
    })
    .catch(err => console.error("Error in getting next task to run", err));
}

export {runNext};