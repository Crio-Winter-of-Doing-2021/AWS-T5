function validStatus(status: string): boolean {
    const statusList: string[] = ["Scheduled", "Canceled", "Failed", "Running", "Completed"]
    if (statusList.includes(status)) {
        return true;
    }
    const pattern = /^Failed at test: \d*$/gs;
    return pattern.test(status)
}

function validURL(url: string): boolean {
    const pattern = /^(?:(?:(?:https?):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i ;
    return pattern.test(url)
}

function validOrchestratorList(orchestratorList: string): boolean {
    if (orchestratorList.length >= 16384) {
        return false;
    }
    orchestratorList = orchestratorList.replace(/\s+/g, '');
    const toCheckURLs: string[] = orchestratorList.split('|');
    if ( toCheckURLs.length % 3 != 1 ) {
        return false
    }
    return toCheckURLs.every(validURL)
}

function validName(name: string): boolean {
    const pattern = /^[a-zA-Z0-9-:,._ ]{0,511}$/gs
    return pattern.test(name)
}

function validPayload(payload: string): boolean {
    try {
        const json = JSON.parse(payload);
        return (typeof json === 'object');
    } catch (e) {
        return false;
    }
}

export { validStatus, validOrchestratorList, validName, validPayload }