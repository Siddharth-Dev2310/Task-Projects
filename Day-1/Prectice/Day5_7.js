//Functions

/*

//! declration
//TODO: () Can Write The Code It's Perameter We Can PAss THe Any VAlue Like The Array , String, Other Funcation Reffrance And also THe WE can PAss THe Other Objects
function checkAge(age){  

    if (age < 18) {
        console.log("You Are adult");   
    } else {
        console.log("Abi Time Hai Bhai"); 
    }
}


//! expressions

const checkAge2 = function (age){  

    if (age < 18) {
        console.log("You Are adult");   
    } else {
        console.log("Abi Time Hai Bhai"); 
    }
}
checkAge(25);

checkAge2(10)
*/

/*
//!Arrow functions


//syntax


/*

const funcationName = () => {

}



//! Code

//TODO : Return Statement The Return The Value 
//TODO Arrow function with implicit return
const multiple = ( a , b) => {
    return a * b
}

// 2. without Return Statement 

const add = ( a , b) => a + b;

*/

// Objects

/*

//also WE Can Pass The Funcations In Side Of The Objects
const student = {
    name : "Siddharth",
    age : 19,
    course : "B.tech-CE",
    collageName : "Sliver Oak UniverCity",
    branch : "computer Engginering",
    getDetails : function() {
        return `i am ${this.name}  and my age is ${this.age}`; //! we can use ony given data type, function , array ,object also can use a symbole 
    }
}

// console.log(student.getDetails());


// const key1 = new Symbol("key12");

*/

/*

const cars = {
    bmw : "drifting",
    marcidies : "luxzary",
    rr : "expenshiv",
    shift : "unexpenshiv",
}   

// console.log(cars.key1);
// console.log(Object.keys(cars));

for(let key in cars){
    console.log(`${key} : ${cars[key]}`);  //? can print the value like key : values ,
}


console.log(Object.values(cars));       //? can print only value but in the array form
console.log(Object.keys(cars));          //? can print only keys but in the araay form
console.log(Object.entries(cars));      //? can print the all of the object in entries form 

*/

/*
const carsModal = {
    modal : "BMW",
    year : "2022",
    price : "1CR"   
}

carsModal.modal = "tesla";

console.log(carsModal.modal);       //? we can also can channge the values like this BMW  = Tesla

delete carsModal.price
console.log(carsModal.price);       //? we can delet the values in the objects like this

console.log(carsModal.hasOwnProperty("modal"));   //? we can check this can have in the object

*/

/*

const studentMarks = [
    {name: "siddharth" , age: 18 , marks : 99},
    {name: "sujal" , age: 19 , marks : 99},
    {name: "jenil" , age: 20 , marks : 100},
    {name: "krish" , age: 18 , marks : 100},

]

let  topper = studentMarks
                        .reduce((max, studentMarks) => (studentMarks.marks >= max.marks ? studentMarks : max), studentMarks[0]);

console.log(`topper :${topper.name} With ${topper.marks}`);     

*/

/*
const bankAcount = {
    name: "rohan",
    blance : 9000,
    diposit(amount){
        this.blance += amount;
        console.log(`Hello ${bankAcount.name} your bank blance is ${this.blance}`);
    },

    withdraw(amount){
        if(amount>this.blance){
            console.log("Dont Enof Money");
        }

        else{
            this.blance -= amount;
            console.log(`Hello ${bankAcount.name} your bank blance is ${this.blance}`);
        }
    }
}

bankAcount.diposit(3000);// we can use the funcation inside the object also we can asses like this 
bankAcount.withdraw(2000);

*/

/*
const user = {
    name : "Raj",
    age : 23
}

const copidUsser = Object.assign({} ,user)         // we can copi that object like this
console.log(copidUsser);

copidUsser.age = 30;            // also we can assien the new values and copi object can change privous object can not change

console.log(copidUsser);

const newUser = { ...user, city : "Junagadh"};      // we can destak like this 
console.log(newUser);

*/

/*
const employee = {
    name : "Siddharth",
    poisitaion : "Computer Engineer",
    salar : 5000
}

const {name, poisitaion} = employee;

console.log(`${name} name is and your postion ${poisitaion}`);

const josnData = JSON.stringify(employee);
console.log(typeof josnData);   // we can convet object into json like this

const parseedData = JSON.parse(josnData)    // also we can convert json into object like this 
console.log(typeof parseedData);
*/

/*
const user = [];

function addUser(name,age){
    user.push(
        {name, age}
    );
}

function displayUser(){
    console.log(user);
}

function userUpdate(index, newName){
    if(user[index]){
        user[index].name = newName;
    }
}

function deleteUser(index){
    user.splice(index , 1);
}

addUser("Siddhart", 18)
addUser("sujal", 21)
displayUser();
userUpdate(1, "Jenil")
displayUser();
deleteUser(1)
displayUser();

*/



let cart = []

let product1 = {
    id:1,
    name: "Leptop",
    price: 50000
}

let product2 = {
    id:2,
    name : "mobile",
    price: 15000
}

function addToCart(product){
    let found = cart.find(item => item.id === product.id);
    if(found){
        found.quantity++;
        
    } else {
        cart.push(
            { ...product ,quantity :1}
        );
    }    
    displayCart()
}    

function removeFormCart(productId){
    cart = cart.filter(item => item.id !== productId);
    displayCart()
}    

function updateQuantity(productId, newQut){
    let product = cart.find(item => item.id === productId);
    if(product){
        product.quantity = newQut
    }    
    displayCart()
}    

function calculateTotal(){
    return cart.reduce((total, item) => total + item.price * item.quantity,0);
}    

function displayCart(){
    console.log("Cart Item:", cart);
    console.log("Total Price:", calculateTotal());
}    

addToCart(product1);
addToCart(product2);
removeFormCart(1)
addToCart(product1);

updateQuantity();



/*
let books = []

let book1 = {
    id: 1,
    name : "The Jungle King Lion",
    Price : 300
}

let book2 = {
    id:1,
    name : "The Flying King Eagle",
    price : 200
}

function addBook(book){
    let found = books.find(item => item.id === book.id);

    if(found){
        found.countNum++;
    } else{
        books.push({ ...book , countNum :1})
    }
    displayBooks();
}

function removeBook(bookId){
    books = books.filter(item => item.id !== book.id)
    displayBooks();
}

function bookCount(bookId, newbookCount){
    let book = book.find(item => item.id === bookId )
    if(book){
        book.countNum = newbookCount;
    } 
    displayBooks();
}

function calculateTotal(){
    return books.reduce((total, book) => total + book.price * book.countNum , 0)
}

function displayBooks(){
    console.log("Book Details:", books);
    console.log("price" ,calculateTotal());   
}

addBook(book1)
displayBooks();
*/