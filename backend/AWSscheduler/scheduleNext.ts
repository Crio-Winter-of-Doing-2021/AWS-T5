import { latestTask } from './latestTask'

function scheduleNext(): void {
    latestTask()
    .then( res => {
        if (res.length > 0) {
            const task = res[0];
            
        } else {
            console.error("Latest task not allotted properly");
        }
    })
    .catch(err => console.error("Error in getting latest task", err));
}

export {scheduleNext};