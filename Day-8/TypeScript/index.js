"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function addTwo(num) {
    return num + 2;
}
addTwo(5);

function getUpper(val) {
    return val.toUpperCase();
}
function signUpUser(name, email, isPaid) {
    console.log("".concat(name, " , ").concat(email, " , ").concat(isPaid));
}
var loginUser = function (name, email, isPaid) {
    if (isPaid === void 0) { isPaid = false; }
};
signUpUser("siddharth", "sid@sid.com", false);
getUpper("siddharth");
var heros = ['thor', 'superman', 'ironman'];
heros.map(function (hero) {
    return "hero is ".concat(hero);
});
var getHello = function (s) {
    return '';
};
getHello("Hello");
function consoleError(ermsg) {
    console.log(ermsg);
}

function handaleError(ermsg) {
    throw new Error(ermsg);
}
consoleError("Error");
handaleError("error");
