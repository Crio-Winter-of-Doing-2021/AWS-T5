import { tasksLessThanTime } from '../dbops/tasksLessThanTime'
import { triggerLambda } from "./triggerLambdaHTTP";

function triggerNext(endTime: number) : void {
    tasksLessThanTime(endTime)
    .then( tasks => {
        let task: {id: string, urlorarn: string, payload: string};
        for (task of tasks) {
            triggerLambda(task);
        }
    });
}

// TEST THE FILE HERE
// triggerNext(new Date().getTime())
// setTimeout((function() {
//     return process.exit(0);
// }), 5000);

export {triggerNext}