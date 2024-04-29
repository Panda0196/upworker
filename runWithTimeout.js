const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const runWithTimeout = (func, timeout) => {
    return Promise.race([
        func(),
        new Promise((resolve, reject) =>
            setTimeout(() => reject('Timeout!'), timeout)
        )
    ])
};

const randomSleep = async () => {
    const randomSeconds = Math.floor(Math.random() * 10) + 1 // Random number between 1 and 10
    console.log(`Sleeping for ${randomSeconds} seconds...`)
    await sleep(randomSeconds * 1000)
    return `Awake after ${randomSeconds} seconds`
};

(async () => {
    while (true) {
        await runWithTimeout(randomSleep, 5000)
            .then(result => console.log(result))
            .catch(error => console.error(error));
    }
})();
