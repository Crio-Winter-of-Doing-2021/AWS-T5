import { editInvokeTime } from './../dbops/editTask';
import { dbID } from './../validateData/dbID';
import { timestampValidate } from './../validateData/timestamp'


async function modifyTask(id : string,new_invoketime : string) {
    if(!dbID(id))
    {
        console.log('Invalid ID');
        return false;
    }
    if(!timestampValidate(new_invoketime))
    {
        console.log('Invalid New Invoke Time');
        return false;
    }
    try {
        let res = await editInvokeTime(id,new_invoketime);
        return res;
    }
    catch(err) {
        console.log("Error : "+err);
        return false;
    }
}

export { modifyTask };