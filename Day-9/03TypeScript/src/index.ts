// class User {
//     public email : string
//     private name : string
//     readonly city : string = "Ahmedabad"

//     constructor(email : string, name : string){
//         this.email = email,
//         this.name = name
//     }

// }


class User {
    constructor(
        public email : string,
        public name : string,

    ){
        
    }
}

const newUser = new User("Sid@Sid.com", "Siddharth");
// newUser.city = "junagadh" //! Readonly

