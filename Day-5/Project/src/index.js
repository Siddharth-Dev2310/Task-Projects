import fs from "fs"
// import { type } from "os";
import path from "path"
import yargs from "yargs"
import { hideBin } from "yargs/helpers"

// console.log(yargs.());


yargs(hideBin(process.argv))
    .command( 'ls [directory]', 'List contents of a directory' ,(yargs) => {
    yargs.positional("directory", {
        discribe : "A directory To List",
        default :"."
    })
    }, (argv) => {
        const tergetDir = path.resolve(argv.directory);

        fs.readdir(tergetDir , (err, files) => {
            if(err){
                console.log("Error Listen The Directory :", err.message);
                return;
            } else {
                files.forEach( (file) => console.log(file))
            }
        })
    }).command('mkdir <name>', 'Create a new directory' , (yargs) => {
        yargs.positional( "name" , {
            discribe : "A name of The new Directory",
            type : String
        })
    }, (argv) => {
        fs.mkdir(argv.name, (err) => {
            if(err) {
                console.log("Error Creating The Directory:", err.message);
                return;
            }

            console.log(`Directory ${argv.name} Created`);
            
        })
    })
    .help()
    .argv

