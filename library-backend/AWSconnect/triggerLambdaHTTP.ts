/**
 * For HTTP calls to trigger your lambda endpoint, with open access. 
 * Get the Trigger by "Add Trigger" on your function console.
 * To avoid open access triggers ( hence saving costs ), use invokeLambda.ts
 */
 
import fetch  from 'node-fetch';
import * as fs from 'fs';
 
function triggerLambda(triggerURL: string, payloadData : unknown ): void {
    try {
        const responseFilePath = "../triggerResponse.txt";
        fetch(triggerURL)
        .then(res => fs.writeFileSync(responseFilePath, res.status.toString()));
    } catch {
        console.error("Problem in Triggering Lambda");
    }
}
 
export { triggerLambda }