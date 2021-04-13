import { validStatus, validOrchestratorList, validName, validPayload } from '../../orchestrator/validate'

const shouldBeTrue = {
    status: 'Failed at test: 667',
    orchestratorList: 'https://sbe5rde8ug.execute-api.us-east-1.amazonaws.com/default/aaa|https://sbe5rde8ug.execute-api.us-east-1.amazonaws.com/default/aaa| https://sbe5rde8ug.execute-api.us-east-1.amazonaws.com/default/aaa|https://sbe5rde8ug.execute-api.us-east-1.amazonaws.com/default/aaa', 
    name: 'same urls', 
    payload: '{}',
}
const shouldBeFalse = {
    status: 'Schedled',
    orchestratorList: 'https://sbe5rde8ug.execute-api.us-east-1.amazonaws.com/default/aaa| https://sbe5rde8ug.execute-api.us-east-1.amazonaws.com/default/aaa|https://sbe5rde8ug.execute-api.us-east-1.amazonaws.com/default/aaa', 
    name: 'same ;;;urls', 
    payload: '{head}',
}

// console.log(validStatus(shouldBeTrue.status), validStatus(shouldBeFalse.status))
// console.log(validOrchestratorList(shouldBeTrue.orchestratorList), validOrchestratorList(shouldBeFalse.orchestratorList))
// console.log(validName(shouldBeTrue.name), validName(shouldBeFalse.name))
// console.log(validPayload(shouldBeTrue.payload), validPayload(shouldBeFalse.payload))