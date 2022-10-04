const Funcs = require("./Functions")
const Helpers = require("./Helpers")

///////////////////////
// Execution Parameters
const TRAIN_COUNT = 1000
const LOCATION_PER_TRAIN_COUNT = 150
const INCIDENT_COUNT = 250

///////////////////////


// Generate Input data
const trains = [...Array(TRAIN_COUNT).keys()].map(_1 => {
    return {
        locations: [...Array(LOCATION_PER_TRAIN_COUNT).keys()].map(_2 => {
            return {
                id: _2
            }
        })
    }
})
const incidents = [...Array(INCIDENT_COUNT).keys()].map(_ => {
    return { location_id: Helpers.randomInt(LOCATION_PER_TRAIN_COUNT), delay: Helpers.randomInt(10) }
})


// Execute and profile
const resultSets = {
    currentAlgo: { durations: [], results: [], func: Funcs.currentFunc },
    betterAlgo: { durations: [], results: [], func: Funcs.betterFunc }
}

for (let _ of Array(5).keys()) {
    for(let k in resultSets) {
        const outcome = Helpers.timeIt(resultSets[k].func, [Helpers.clone(trains), Helpers.clone(incidents)])
        resultSets[k].results.push(outcome[0])
        resultSets[k].durations.push(outcome[1])
    }
}


// Report outcome
for(let k in resultSets) {
    const durs  = resultSets[k].durations
    console.log(`Average duration [${k.padStart(16, " ")}]: ${durs.reduce((a, b) => a + b, 0) / durs.length} ms [${durs}]`)
}

if(!Helpers.resultSetsMatch(resultSets.currentAlgo.results, resultSets.betterAlgo.results)) {
    console.error("(!) Algorithms don't return the same output (!)")
}

