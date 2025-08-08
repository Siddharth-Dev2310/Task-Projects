function getRandomNumbers(count, min, max) {
    const arr = new Uint32Array(count);
    crypto.getRandomValues(arr); // Fill array with random values

    return Array.from(arr, num => min + (num % (max - min + 1)));
}

console.log(getRandomNumbers(10, 1, 10)); // 10 random numbers between 1-100

async function getData() {
  const url = "https://randomuser.me/api/";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

// Call the function
getData();