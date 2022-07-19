const express = require('express');
const app = express();
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

const path = require('path');
const workerPath = path.resolve('loop-worker.js');

app.use("/threadExample", (req, res) => {

    // using worker thread
    let data = new Promise((resolve, reject) => {
        const worker = new Worker(workerPath, {
            workerData: 10000000000,
        });
        worker.on('message', resolve);
        worker.on('error', reject);
        worker.on('exit', code => {
            if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`));
        });
    })

    data.then(function (result) {
        res.json("data")
    })

    // using single thread
    // for (let i = 0; i < 10000000000; i++) {
    // }
    // res.json("data")

})

app.listen(3000, () => {
    console.log("listen at 3000 port");
})