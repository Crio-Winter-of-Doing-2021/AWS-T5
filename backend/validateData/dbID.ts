import { taskByID } from "../dbops/taskById";

async function dbID(taskID: string) : Promise<boolean | void> {
    try {
        const pattern = /[\d]+/;
        if (pattern.test(taskID)) {
            const ret = await taskByID(taskID)
                .then(res => {
                    if (res.length > 0) {
                        return true;
                    } else {
                        return false;
                    }
                }).
                catch(err => console.error("Task ID not queried properly", err));
            return ret;
        } else {
            return false;
        }
    } catch {
        console.error("ID Validation Error !");
    }
}

export { dbID }