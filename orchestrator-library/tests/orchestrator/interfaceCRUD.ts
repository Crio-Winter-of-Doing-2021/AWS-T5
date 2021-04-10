import { getTasks, editTask, scheduleOrchestration } from '../../orchestrator/interfaceCRUD'

// getTasks({})
// .then(res => console.log(res))
// .catch(err => console.error(err))
// getTasks({taskID: 1})
// .then(res => console.log(res))
// .catch(err => console.error(err))
// getTasks({status: 'Scheduled'})
// .then(res => console.log(res))
// .catch(err => console.error(err))


// editTask({taskID: 1, invoke_delay: 10000})
// .then(res => console.log(res))
// .catch(err => console.error(err))
// editTask({taskID: 2, newStatus: 'Running'})
// .then(res => console.log(res))
// .catch(err => console.error(err))

scheduleOrchestration('https://sbe5rde8ug.execute-api.us-east-1.amazonaws.com/default/aaa|https://sbe5rde8ug.execute-api.us-east-1.amazonaws.com/default/aaa| https://sbe5rde8ug.execute-api.us-east-1.amazonaws.com/default/aaa|https://sbe5rde8ug.execute-api.us-east-1.amazonaws.com/default/aaa', 'testing CRUD interface', 10000, '{}')
.then(res => console.log(res))
.catch(err => console.error(err))