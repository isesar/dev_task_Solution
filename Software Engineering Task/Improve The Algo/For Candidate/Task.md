## Background
You are on the team responsible for building and maintaining an API used by train operators.

The client has reported that throughout the course of the day the response time of the API is increasing and its having a negative impact.

You've narrowed down the problem to a specific function that has the following responsibility:
 - For a set of Trains and Incidents, determine the delay that each train incurs due to the incidents

The current implementation of this logic can be found in `currentFunc()` in `Functions.js`.


## Task

Review the current logic and implement an improved version within the stub function `betterFunc()` in `Functions.js`

Running `main.js` will output the difference in performance and output of both versions - For example:

```
Average duration [     currentAlgo]: 243.2 ms [268,252,228,222,246]
Average duration [      betterAlgo]: 0.2 ms [1,0,0,0,0]
Algorithms don't return the same output (!)
```

Feel free to experiment with the `Execution Parameters`, but note that the implementation of `main.js` is insufficient to handle large values (e.g. `v8::internal::V8::FatalProcessOutOfMemory`).
