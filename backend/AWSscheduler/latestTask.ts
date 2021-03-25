import { tasksByStatus } from './../dbops/tasksByStatus';

async function latestTask() {
    return tasksByStatus('Scheduled')
    .then( res => {
        return res;
    })
    .catch( err => {
        console.log(err);
    })
}

export { latestTask };