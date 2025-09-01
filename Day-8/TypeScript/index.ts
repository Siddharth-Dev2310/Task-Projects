

function addTwo(num : number){
    return num + 2
}

addTwo(5);

function getUpper(val : string){
    return val.toUpperCase()
}

function signUpUser(name : string, email : string, isPaid : boolean){
    console.log(`${name} , ${email} , ${isPaid}`);
    
}

let loginUser = (name : string, email : string, isPaid : boolean = false) => {}

signUpUser("siddharth", "sid@sid.com", false)

getUpper("siddharth")

const heros = ['thor', 'superman', 'ironman']

heros.map( (hero) : string => {
        return `hero is ${hero}`
} )


const getHello = (s:string) : string => {
    return ''
}

getHello("Hello")


function consoleError(ermsg : string) :void {
    console.log(ermsg);
    
}

function handaleError(ermsg : string) : never {
    throw new Error(ermsg)
}

consoleError("Error")

handaleError("error")

export {}