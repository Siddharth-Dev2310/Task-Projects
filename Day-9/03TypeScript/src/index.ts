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

    protected _courseCount = 2

    readonly city : string = "Ahemedabad"
    constructor(
        public email : string,
        public name : string,

    ){
        
    }

    private deletedToken = () => {
        console.log("Token Deleted");
    }

    get getAppleEmail() : string {
        return `Apple${this.email}`
    }


    get courseCount(): number {
        return this._courseCount
    }

    set courseCount(courseNum) {
        if (courseNum <= 1) {
            throw new Error("Course count should be more than 1")
        }
        this._courseCount = courseNum
    }




}

const newUser = new User("Sid@Sid.com", "Siddharth");
// newUser.city = "junagadh" //! Readonly

// newUser.deletedToken()