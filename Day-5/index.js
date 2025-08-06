const newPromise = new Promise(function(resolve, reject){
    setTimeout(function(){
            resolve(2)
        }
    ,1000)
})

newPromise.then( num =>  {
    return num + 1
})
.then( num => console.log(num + 4) )
.catch( (error) => console.log(error))

// newPromise(1);
