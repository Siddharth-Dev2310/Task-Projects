interface iUser {
    readonly dbId : number
    email : string,
    userId : number,
    googleId? : string | number,
    // startTrial : () => string,
    startTrial() : string,
    getCoupan(coupanname : string, value : number) : number
}

interface iUser {
    githubId : string
}


interface Admin extends iUser {
    role : "Admin" | "ta" | "learner"
}

let Siddharth: Admin = {
    dbId: 123456,
    email: "Sid@1.com",
    userId: 966685959,
    role : "Admin",
    githubId : "sid2334",
    startTrial: () => {
        return "Trial started";
    },
    getCoupan: (name: string, off: number) => {
        return 20;
    }
}

Siddharth.email = "Sid@3.com"
// Siddharth.dbId = 65 //? Given The Error -> ReadOnly 