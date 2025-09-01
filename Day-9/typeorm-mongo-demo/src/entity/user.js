import {EntitySchema} from "typeorm"
import { ObjectId } from "mongodb"; 

export default  new EntitySchema({
    name : "User",

    columns : {
        id : {
            type : ObjectId,
            primary : true,
            generated : true
        },

        name : {
            type : String
        },

        email : {
            type : String,
            unique : true
        },

        age : {
            type : Number
        }
    }
});