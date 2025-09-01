/*
const User = {
    name : "Siddharth",
    age : 20,
    isActive : false
}

function createUser({name : string, isPaid : boolean}){}

let newUser =  {
    name : "Siddharth",
    isPaid : false,
    email : "sid@sid.com"
}

createUser(newUser)


function createCouse( ) : {name : string, price : number} {
    return {name : "reactJs" , price : 399}
}

type User = {
    name : string,
    email : string,
    isActive  : boolean
}

function createUsers(user : User):User{
    return {name : "",
    email : "",
    isActive  : false}
}
createUsers({name : "", email : '', isActive : false})
*/

type User = {
    readonly _id :string,
    name : string,
    email : string,
    isActive : boolean,
    creadDetails? : number 
}

let myUser : User = {
    _id : '1234',
    name : ' h ',
    email : 'Sid@Sid.com',
    isActive : false
}

type cardNumber = {
    cardnumber : string
}

type cardDate = {
    carddate : string
}

type cardDetails = cardNumber & cardDate & {
    cvv : number
}

myUser.email = "Siddharth@gmail.com"
// myUser._id = "12345677" //! Given The Error Becues We Can Not Change The VALues Of The readonly VAlues 

