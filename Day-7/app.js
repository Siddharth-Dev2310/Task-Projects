function getRandomNumbers(count, min, max) {
    const arr = new Uint32Array(count);
    crypto.getRandomValues(arr); // Fill array with random values

    return Array.from(arr, num => min + (num % (max - min + 1)));
}

console.log(getRandomNumbers(10, 1, 10)); // 10 random numbers between 1-100
