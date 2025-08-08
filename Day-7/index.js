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
        if(GueesNum){
            let randomNumStore = [];
            let randomNumber;

            let spins = 10;
            let count = 0;

            function spin() {
                randomNumber = Math.floor(Math.random() * 10) + 1;
                console.log("Random Number:", randomNumber);
                randomNumStore.push(randomNumber);
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
            console.log("history :" ,history);
            rl.close();
        }
    })
}

async function playGame(){
    let round = 5;
    for(let i=0; i < round; i++){
        await wheelSpin();
    }
    console.log(history);   
    rl.close();

}
playGame();