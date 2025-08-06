/*
let promiseOne = new Promise(function(resolve, reject){
    setTimeout( function(){
        console.log("Async Task has been Done");
        resolve()
    } ,1000)
})

promiseOne.then( function(){
    console.log("Promise Complated");
})

new Promise(function(reslove, reject){
    setTimeout( function(){
        console.log("Async Task has been Done");
        reslove();
    } ,1000)
}).then(
    function(){
        console.log("Task Has Been Done");
    }
)

let promiseThree = new Promise( function( resolve , reject ) {
    setTimeout( function(){
        resolve({username : "Siddharth", age : "18", isActive : true})
    },1000 )


} )


promiseThree.then( 
    function(user){
        console.log(user);
        
    }
)
*/
let promiseFour = new Promise( function( resolve , reject) {
    setTimeout(function (){
        let error = true;

        if(!error){
            resolve({username : "Siddharth", age : "18", isActive : true}, "Task Has Been Done")
        } else {
            reject("Somthing went Wrong")
        }
    })
})

promiseFour
.then( function(user){
    // console.log(user.username);
    return user.username
}).then( function(username){
    console.log(username);
})
.catch( (error) => console.log("e :-", error))


let promiseFive = new Promise( function( resolve, reject){
    setTimeout( function(){
        let error = true
        if (!error) {
            resolve({language : "Javascript", topic : "Promises"})
        } else {
            reject("Somting went Wrong ")
        }
    })
} )

async function cansumePromise() {
    try {
        let responce =await promiseFive
        console.log(responce);
    } catch (error) {
        console.log(error); 
    }
}

cansumePromise()


// async function getData() {
//   const url = "https://api.github.com/users/mrsiddharthsolanki";
//   try {
//     const response = await fetch(url);

//     console.log("response: -", response);
    

//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }

//     const json = await response.json();
//     console.log(json);
//   } catch (error) {
//     console.error("Error fetching data:", error.message);
//   }
// }

// getData();


fetch("https://api.github.com/users/mrsiddharthsolanki")
    .then(function(responce){
        return responce.json()
    })
    .then(function(data){
        console.log(data);
        
    })
    .catch(function(error){
        console.log(error); 
    })