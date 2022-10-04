const Helpers = require("./Helpers");

/**
 * Adds a new Record
 * @param newRecord New record
 * @return outcome of adding New record
 */
const addNewRecord = async (newRecord) => {
  const logger = Helpers.getNamedLogger("logger");

  // Augment
  newRecord._internal = Helpers.generateInternalDetailsForRecord(newRecord);

  // Connect to database
  const dataManager = await new Helpers.AsyncDataManager(
    process.env["HOST"]
  ).connect(); // maybe to connection in main function and just pass dataManager ?

  // Parse & Prepare
  // if(newRecord.siblingIds && newRecord.siblingIds.length > 1) {
  //     for (let singlingId of newRecord.siblingIds) {
  //         dataManager.addSiblingToRecord(singlingId, newRecord.id)  //should replace parameters, async addSiblingToRecord(recordId, siblingRecordId){}
  //     }
  // }

  // use Promise.all instead of iterating one by one
  await Promise.all(
    newRecord.map(async (record) => {
      await dataManager.addSiblingToRecord(newRecord.id, record.singlingId);
    })
  );
  // ADDED await
  // Add record to database
  const result = await dataManager.addRecord(newRecord);

  logger.debug(`Added new record`);

  // Return outcome
  return Helpers.httpJsonResponse(200, {
    outcome: result,
    payload: newRecord,
  });
};

/**
 * [POST] API Endpoint </api/record>
 *  - Assume that <req> is valid and correct and that <body> has been provided by a third-party client
 */
const res = (async (req) => {
  const logger = Helpers.getNamedLogger("logger");

  let newRecord = req.body;

  try {
    const outcome = await addNewRecord(newRecord);

    logger.debug(
      `Added new record with ${newRecord.siblingIds.length} siblings`
    );

    return outcome;
  } catch (e) {
    logger.debug(e);
    return e;
  }
})({
  // ...
  body: {
    id: "1",
    name: "Steve Marshall",
    siblingIds: [17, 18, 1, 20],
  },
  // ...
});

console.log(res);
