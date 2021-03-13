import { tasksByStatus } from './../dbops/tasksByStatus';

async function latestTask() {
    let latest = await tasksByStatus('Scheduled');
    return latest[0];
}

export { latestTask };