const { getNewCache } = require("./Cache");

const currentFunc = (trains, incidents) => {
  for (let train of trains) {
    train.locations.forEach((l) => (l.incidents = []));

    for (let incident of incidents) {
      for (let loc of train.locations) {
        if (loc.id === incident.location_id) {
          loc.incidents.push(incident);
        }
      }
    }

    train.totalDelay = 0;
    for (let loc of train.locations) {
      if (loc.incidents.length > 0) {
        for (let incident of loc.incidents) {
          train.totalDelay += incident.delay;
        }
      }
    }
  }
  return trains;
};

const cache = getNewCache();

const betterFunc = (trains, incidents) => {
  //-- Improved logic here --//
  if (!cache.get("trains")) {
    const trainsWithDelay = calculateDelay(trains, incidents);
    cache.set("trains", trainsWithDelay);
    return trainsWithDelay;
  }
  const cachedTrains = cache.get("trains");
  return cachedTrains;
};

const getObjectIncidents = (incidents) => {
  const incidentObject = {};
  incidents.forEach((incident) => {
    if (!incidentObject[incident.location_id]) {
      incidentObject[incident.location_id] = incident.delay;
    } else {
      // in case there is a duplicate
      incidentObject[incident.location_id] += incident.delay;
    }
  });

  return incidentObject;
};
const calculateDelay = (trains, incidents) => {
  const trainLength = trains.length;
  const incidentObject = getObjectIncidents(incidents);
  for (let i = 0; i < trainLength; i++) {
    const train = trains[i];
    train.totalDelay = 0;
    const trainLocationsLength = train.locations.length;

    for (let k = 0; k < trainLocationsLength; k++) {
      trainLocation = train.locations[k];
      if (incidentObject[trainLocation.id]) {
        train.totalDelay += incidentObject[trainLocation.id];
      }
    }
  }

  return trains;
};
module.exports = {
  currentFunc,
  betterFunc,
};
