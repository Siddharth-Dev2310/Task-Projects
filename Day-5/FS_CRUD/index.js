import fs from "fs"
import readline from "readline"
import { stdin as input, stdout as output } from 'node:process';
import { resolve } from "node:path";
import { error } from "node:console";

let rl = readline.createInterface( input , output );

console.log("1 -> Create File");
console.log("2 -> Read File");
console.log("3 -> Delete File");
console.log("4 -> Update File");

const choices = await new Promise(resolve =>  rl.question("Enter The number Chooes the CRUD(1/2/3/4): ", resolve))


if(choices == "1"){
    createFile()
} else if (choices == "2"){
    readFile()
} else if ( choices == "3"){
    deletefile()
} else if( choices == "4"){
    updateFile()
} 
else {
    console.log(` you choies is wrong ${choices} please make sure choice has write`);
    // return;
}

async function  createFile(){
    
    const name = await new Promise(resolve => rl.question("Enter The File Name:", resolve))

    const content = await new Promise(resolve => rl.question("Enter content to write to file: ", resolve));

    const createdFile = fs.createWriteStream(name);
    
    createdFile.write(content)

    createdFile.end();
    rl.close()
}

async function deletefile(){
    const pathname = await new Promise(resolve => rl.question("Enter The path:", resolve));

    await fs.promises.access(pathname);

    await fs.promises.unlink(pathname);
    console.log(`file has been delet with this path ${pathname}`);
    
    rl.close();
}

async function readFile(){
    const pathname = await new Promise(resolve => rl.question("Enter The path:", resolve));

    const data = await fs.promises.readFile(pathname)

    if(!data){
        console.log( "Sommting went wrong" ,error);
        
    } else {
        console.log(data.toString());   
    }
    console.log(` Read file succsfully`);
    rl.close()
}

async function updateFile(){
    const pathname = await new Promise(resolve => rl.question("Enter The path:", resolve));
    
    const content = await new Promise(resolve => rl.question("Enter content to write to file: ", resolve));

    
    await fs.promises.writeFile(pathname,content)

    rl.close()
}


deletefile();
readFile();
updateFile();