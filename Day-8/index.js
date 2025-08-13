import dotenv from "dotenv"
import readline from "readline"
import { stdin as input, stdout as output } from 'node:process';

dotenv.config(
  {
    path : './.env'
  }
)

let rl = readline.createInterface({
    input,
    output
})


let API_KEY = process.env.API_KEY

const city = await new Promise(resolve => rl.question("Please Enter The City Name :" , resolve))

async function getData() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();

    console.log("City: ",city);
    
    console.log("Description:", json.weather[0].description);
    // console.log("Temp:");
    for (const key in json.main) {
      if (Object.prototype.hasOwnProperty.call(json.main, key)) {
        const element = json.main[key];
        console.log(`${key} : ${element} °C`);
        
      }
    }

    
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

rl.close()

getData();