class AsyncDataManager {
    constructor() {}

    async connect(){ return this }
    async addRecord(newRecord){}
    async addSiblingToRecord(recordId, siblingRecordId){}
    async disconnect(){ return this }
}


const httpJsonResponse = (statusCode, jsonPayload) => {}


const getNamedLogger = (name) => {
    return {
        // ...
        debug: (msg) => console.log(`[${name}][DEBUG] ${msg}`)
        // ....
    }
}


const generateInternalDetailsForRecord = (record) => {}


module.exports = {
    AsyncDataManager,

    httpJsonResponse,

    generateInternalDetailsForRecord,

    getNamedLogger
}