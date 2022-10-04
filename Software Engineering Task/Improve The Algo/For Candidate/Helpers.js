const clone = o => JSON.parse(JSON.stringify(o))

const randomInt = (max) => Math.floor(Math.random() * max);

const timeIt = (func, args) => {
    const startTime = (new Date()).getTime()

    const result = func(...args)

    return [result, (new Date()).getTime() - startTime]
}

const resultSetsMatch = (setA, setB) => {
    let setAFlat = setA.reduce((a, b) => a.concat(b), [])
    let setBFlat = setB.reduce((a, b) => a.concat(b), [])
    let foo = setAFlat.map((t, i) => {
        return t.totalDelay === setBFlat[i].totalDelay
    })
    return setA.length === setB.length && foo.reduce((a, b) => a && b, true)
}

module.exports = {
    clone,
    randomInt,
    timeIt,
    resultSetsMatch
}