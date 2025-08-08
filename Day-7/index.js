import readline from "readline"
import { stdin as input, stdout as output } from 'node:process';

let rl = readline.createInterface({
    input,
    output
})

let history = [];

async function wheelSpin() {
     
    return new Promise (async (resolve) => {
        const GueesNum = await new Promise(resolve =>  rl.question("Guess a Number Between 1 To 10 : ", resolve))
        
        if(  GueesNum <= 10 && GueesNum >= 1  ){
            let randomNumStore = [];
            let randomNumber;

            let spins = 10;
            let count = 0;

            function spin() {
                while (randomNumStore.length < 10) {
                    randomNumber = Math.floor(Math.random() * 10) + 1;
                    if (!randomNumStore.includes(randomNumber)) {
                        randomNumStore.push(randomNumber);
                        console.log("Random Number:", randomNumber);
                    }
                }
                count++;

                if (count < spins) {
                    setTimeout(spin, 1000);
                } else {
                    console.log("All numbers:", randomNumStore);

                    console.log("Array Last element :", randomNumStore[9]);
                    
                    if (randomNumStore.includes(Number(GueesNum))) {
                        console.log("win");
                        history.push("win");
                    } else {
                        console.log("lose");
                        history.push("lose");
                    }
                    resolve()
                }
            }
            console.log("Spinning...");
            spin();
        } else {
            console.log("please Enter The Number, After I Can Spin!..");
            history.forEach( (index, val) => {
                console.log(`${index} : ${val} `);
                val++;
            } )
            rl.close();
        }
    })
}

async function playGame(){
    let userInput = await new Promise( (resolve) => rl.question("Do You want To play Game (yes/No):" , resolve))

        let count = 0;
        if(userInput == "yes"){
                await wheelSpin();
                history.forEach( (index, val) => {
                    console.log(`${val} : ${index} `);
                        val++;
                }) 
                count++;
                await playGame();
            rl.close();
        } else {
            console.log("can not play");
            rl.close();
        }
}
playGame();