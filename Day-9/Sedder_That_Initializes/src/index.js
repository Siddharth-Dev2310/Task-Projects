import {app} from './app.js'
import { connectDB } from "./db/index.js"

connectDB()
        .then( () => {
            app.listen(process.env.PORT || 9000 ,  () => {
                console.log(`🚀 Server is running on port ${process.env.PORT || 9000}`);
            } )
        })
        .catch( (error) => {
            console.log( "Error : Connetcting The Database :" ,  error);
            process.exit(1);
        });