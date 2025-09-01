//! Condisation Statement

//!if Codn
// check The Condition true are not it's true after can excute the code 

let newName  =  "alexa"

if(newname == "alexa"){
    console.log(`Print newName : ${newName}`);
}


//! if / else Statement

let playing = "Cricket"

if(playing === "Cricket"){
    console.log("Yes Playing Cricket");
    
} else {
    console.log("Do not Play Cricket"); 
}

//* Switch statements

let Day = "Sunday";

    switch (Day) {
        case Day = "monday":
            console.log("monday");
            break;

        case Day = "tuesday":
            console.log("tuesday");
            break;

        case Day = "wednesday":
            console.log("wednesday");
            break;
        
        case Day = "thursday":
            console.log("thursday");
            break;

        case Day = "friday":
            console.log("friday");
            break;
        
        case Day = "saturday":
            console.log("saturday");
            break;

        case Day = "sunday":
            console.log("sunday");
            break;

        default:
            break;
    }

// loops

//for loop

let array = [10,20,30,40,50]

for(let i = 0; i<=array.length ; i++){
    console.log(`Array Index ${array.indexOf} and values ${array}`);
}

//while loop 

let conut = 23

while(conut < 10){
    console.log(`Count :- ${conut}`);
}

//for .. in

//! Can use in The Objects 

let object = {
    name : "Siddharth",
    age : 18,
    isActive : true
}

for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
        const element = object[key];
        console.log(element);
        
    }
}

//For ..of

//! Can use In The Arrys

let myArr = [20,30,80,90,54,51,64] 

for (const element of myArr) {
    console.log(element);
}

//Do while

let i = 1


do {
    console.log(`Element of :- ${i}`);
    i++
} while (i < 20);

// //! Break and continue

for (let index = 0; index < 300; index++) {
    
    if(index === 20){
        break
    }
    console.log(` newCount : - ${index}`);
    
}

for (let index = 0; index < 50; index++) {
    
    if(index === 20){
        continue
    }
    console.log(` newCount : - ${index}`);
    
}

//nested loops

let rowss = 3;
let collums = 4;

for (let rows = 0; rows < 3; rows++) {  // outer 
    
    let rowOutput = "";
    for(let collums = 0; collums < 3; collums++){  //inner
       rowOutput += `(${rows} + ${collums})`
    }
    console.log(rowOutput);
}
