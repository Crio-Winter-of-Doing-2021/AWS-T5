/**
 * For HTTP calls to trigger your lambda endpoint, with open access. 
 * Get the Trigger by "Add Trigger" on your function console.
 * To avoid open access triggers ( hence saving costs ), use invokeLambda.ts
 */


import https from 'https';
import { hostname } from 'os';

function parseTriggerURL(triggerURL: string) {
    // automatically upgrades to HTTPS URL, if need be, since AWS will comply

    var pattern = /^((http|https):\/\/)/;
    if(!pattern.test(triggerURL)) {
        triggerURL = "https://" + triggerURL;
    }
    const splitURL: string[] = triggerURL.split('/');
    const hostname: string = splitURL[2];
    var urlPath: string = "/";
    if (splitURL.length > 2) { 
        urlPath += splitURL.slice(3, splitURL.length).join('/');
    }

    return {
        "hostname": hostname,
        "path": urlPath,
    }
}

function triggerLambda(triggerURL: string, payloadData: any) {
    try {
        const payload = JSON.stringify(payloadData);
        const URLComponents = parseTriggerURL(triggerURL);

        const options = {
            hostname: URLComponents.hostname,
            path: URLComponents.path,
            method: 'GET',  
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': payload.length,
            }
        }
        
        const req = https.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)
        });
        req.on('error', error => {
            console.error(error);
        });
        
        req.write(payload);
        req.end();
    } catch {
        console.error("Problem in Triggering Lambda");
    }
}

export { triggerLambda }