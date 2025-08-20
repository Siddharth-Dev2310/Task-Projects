// class User {
//     public email : string
//     private name : string
//     readonly city : string = "Ahmedabad"
//     constructor(email : string, name : string){
//         this.email = email,
//         this.name = name
//     }
// }
var User = /** @class */ (function () {
    function User(email, name) {
        this.email = email;
        this.name = name;
    }
    return User;
}());
var newUser = new User("Sid@Sid.com", "Siddharth");
// newUser.city = "junagadh" //! Readonly
