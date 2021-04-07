import { tasksLessThanTime } from '../../dbops/tasksLessThanTime';

tasksLessThanTime(new Date().getTime())
.then(res => {
    console.log(res)
    return process.exit(0)
});