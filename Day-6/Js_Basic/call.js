function SetuserName(username){
    this.username = username;
    console.log("called"); 
}

function createUser(username, email, password){
    SetuserName.call(this, username);

    this.email = email,
    this.password = password
}

const chai = new createUser("hello", "hello@user.name", "1234")
console.log(chai);
