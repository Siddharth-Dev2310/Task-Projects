// basic

// print statement

console.log("Hello world");


// variable  

var a = 10;  //!  decalare in the globly any The Access
let b = 10;  //!  have the block of Scope like The {} (Calribracktes)
const c = 10;  //! not Change The Value of Thiss

// Data Types

// //? have The Two Types Of THe Data Types 
//* 1. Preamtive DataTypes
// * 2. Non - Preamtive DataTypes //TODO Connect With The Reffrance 

//TODO 1. Preamtive DataTypes


let num = 10; //! Number
let officeName = "Devstree"; //! String can store The any values 
let isActive  = false; //! boolen (True , False)
let city; //! undefine (can not asieen The value)
let name = null; //!  Represents the intentional absence of any object value. It is a primitive value.
let bigInt  = 432345678908765432345n; //! have the big values can type The n 
let symbolId = Symbol('uniqueId') //! assigen The Sysmbol using The Sysmbol Keyword

//TODO 1. Non-Preamtive DataTypes

//array 

let newArray  = [10,20,30,40,50,60];
//we Can Declare The Array In THe [] Bracktes 
// also The Can store in the Cotinres memory with Deffrant Data Types 


let newArray2 = [1, "Devstree", true]

console.log("Array 1 :-" ,newArray);
console.log("Array 2 : -" ,newArray2);



//object 

let newObj = {
    name : "Siddharth",
    age : 18,
    inOffice : true,
    roal : "MERN Stack"
}

// we can Declare The Object in {} bracktes 
//also The Can store THe Values In The Key value Pair

console.log("Object 1 : -" , newObj);

//Funcations

//*Systex


//TODO perform The Given The Task

function printHello(){  //TODO can pass The any of THe perameter and also The Can pass The Variable any more etc...
    console.log("Hello");
}

//*Declration

printHello()  //! () can use Then excute The Funcation and also And Can Not The use The () only Can pass The Reffracne

//Operators

//TODO Can Hahe The Multiple Types OF Operators Main Three Can Cover 
//TODO 1.Arithmatic Operators
//TODO 2.Logic Operators
//TODO 3.Comparistion Operators

//* 1.Arithmatic Operators

console.log(1+2);  //(Addition)
console.log(6-3); //subtection
console.log(2*2); //multiplicattion

// etc.

//* 2.Logic Operators

let x = 5;
let y = 10;

//and
if(x >= 5 && y < 2){
    console.log(`Ites Truee ${x} , ${y}`);
} // and (can Both Candition Can True Given The true)

//or
if(x >= 5 || y < 2){
    console.log(`Ites Truee ${x} , ${y}`);  //TODO its Can The BackTickes Mark calles Template literals
} // and (any one Candition Can True Given The true)

// "!" This Can Use For The not 

//Comparion

console.log(x == y); //TODO: true

console.log(x < y); //TODO: true

console.log(x > y); //TODO: False 


// Type Conversion 

//TODO: 2 Tyes
//* 1.Explicit Conversion
//* 2.Implicit Conversion

//* 1.Explicit Conversion

let string1 = "456"
let number1 = Number(string1) // WE Can Ddefine The Data Type In The Explicit Conversion

console.log(number1);

console.log("String Type:-" ,typeof(string1));
console.log("Number Type:-" ,typeof(number1));

//* 2.Implicit Conversion

let str1 = "20"
let num1 = 30

let res = str1 + num1 //TODO : Ites Alos Called The string concatenation

console.log("Implicit Conversion:-",res);