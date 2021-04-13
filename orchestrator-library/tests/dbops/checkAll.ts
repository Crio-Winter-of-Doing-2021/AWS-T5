import { backupDB } from '../../dbops/backupDB'
import { dbInit } from '../../dbops/dbInit'
import { allTasks, taskByStatus, taskByID } from '../../dbops/getTaskFilter'
import { editInvokeTime, editStatus } from '../../dbops/modifyTask'
import { setInvoke } from '../../dbops/setInvoke'
import { tasksLessThanTime } from '../../dbops/tasksLessThanTime'

// backupDB()
// dbInit()

// allTasks()
// .then(res => console.log(res))
// .catch(err => console.error(err))
// taskByStatus("Scheduled")
// .then(res => console.log(res))
// .catch(err => console.error(err))
// taskByID(1)
// .then(res => console.log(res))
// .catch(err => console.error(err))

// editInvokeTime('1', 20000)
// .then(res => console.log(res))
// .catch(err => console.error(err))
// editStatus('1', 'Running')
// .then(res => console.log(res))
// .catch(err => console.error(err))

// setInvoke('https://sbe5rde8ug.execute-api.us-east-1.amazonaws.com/default/aaa|https://sbe5rde8ug.execute-api.us-east-1.amazonaws.com/default/aaa| https://sbe5rde8ug.execute-api.us-east-1.amazonaws.com/default/aaa|https://sbe5rde8ug.execute-api.us-east-1.amazonaws.com/default/aaa', 'same urls', 10000, '{}')
// .then(res => console.log(res))
// .catch(err => console.error(err))

// tasksLessThanTime(new Date().getTime())
// .then(res => {
//     console.log(res)
// });