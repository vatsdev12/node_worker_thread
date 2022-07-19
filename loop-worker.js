const { parentPort, workerData } = require('worker_threads');

// get the array numbers
const numbers = workerData;

for (let i = 0; i < numbers; i++) {

}

// return result
parentPort.postMessage("data");

//10000000000