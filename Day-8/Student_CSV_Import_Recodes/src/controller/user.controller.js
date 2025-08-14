import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHendler} from "../utils/asyncHendler.js"
import { User } from "../models/user.model.js"
import { Country } from "../models/country.model.js"
import {City} from "../models/city.model.js"
import {State} from "../models/state.model.js"
import {Course} from "../models/course.model.js"
import csv from "csvtojson"
import path from "path"

const createStudent = asyncHendler( async (req, res) =>{
    //!: collect The Data Form The Student like {Name, Email, Phone, Country, State, City, Course} -> req.Body
    //?: Check The Validation user Can Empty Filed Can Pass Or Not?
    //*: If The Student Alreedy Existing The Given the Error
    //TODO: if The User Can Not Existing Create The New Student
    //?: Create The Object Of the Student Date 
    //!: If The Student Object Can Not Create Given The Error (Somthing Went wrong)
    //*: And Given The User Return The Object

    const {name, email, phone, country, state, city, course} = req.body;

    if([name, email, phone].some( (filed) => filed?.trim() === '' )){
        throw new ApiError(400, "All Fileds Are Requied")
    }

    const countryDoc =  await Country.create(
        {
            name : country?.toLowerCase(),
        }
    );
    const stateDoc = await State.create(
        {
            name : state?.toLowerCase(),
        }
    );
    const cityDoc = await City.create(
        {
            name :  city?.toLowerCase(),
        }
    );

    if(!countryDoc || !stateDoc || !cityDoc ){
        throw new ApiError(400, "Invalid country, state, or city name")
    }

    let courseIds = [];
    if(Array.isArray(course)){
        courseIds = await Promise.all(
            course.map(async (coursename) => {
                let courseDoc = await Course.findOne(
                    {
                        name : coursename.toLowerCase()
                    }
                )

                if(!courseDoc){

                    courseDoc = await Course.create({ name : coursename.toLowerCase() })

                }

                return courseDoc?._id
            })
        )
    }

    const existingUser = await User.findOne({
        $or : [{name}, {email}]
    })

    if(existingUser){
        throw new ApiError(402, "User Alredy Existing")
    }

    const user = await User.create({
        name : name?.toLowerCase(),
        email: email?.toLowerCase(),
        phone,
        country : countryDoc?._id,
        state : stateDoc?._id,
        city : cityDoc?._id,
        course : courseIds
    })

    const createdUser = await User.findById(user?._id)
    .select("name email phone")
    .populate(
        {
            path : "country",
            select : "name"
        }
    )
    .populate(
        {
           path : "state",
           select : "name country"
        }
    )
    .populate(
        {
            path : "city",
            select : "name state"
        }
    )
    .populate(
        {
            path : "course",
            select : "name"
        }
    );

    if(!createdUser){
        throw new ApiError(500, "Somting Went Wrong")
    }

    return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    createdUser,
                    "Student Scussfully Created"
                )
            )

})

const fileUplodeOnMongoDB = asyncHendler( async (req, res) => {
    //! : req.body -> File;
    //? : can convte excle into The extenstion In the csv 
    //* : can store The file in mongoDb fildes
    //TODO : desture The whole Data
    //! : store in The mongoDB data 
    //? : return The Responce

    const filePath =  req.file?.path;

    const students = await csv().fromFile(filePath);

    for (const student of students) {
        const {name, email, phone, country, state, city, course} = student;

        const countryDoc =  await Country.findOne(
            { 
                name: country?.toLowerCase() 
            }
        ) ||  await Country.create(
            {   
                name : country?.toLowerCase(),
            }
        );

        const stateDoc = await State.findOne(
            {
                name : state?.toLowerCase()
            }
        ) || await State.create(
            {
                name : state?.toLowerCase(),
            }
        );

        const cityDoc = await City.findOne(
            {
                name : city?.toLowerCase()
            }
        ) || await City.create(
            {
                name :  city?.toLowerCase(),
            }
        );

        let courseArr = [];
        if (Array.isArray(course)) {
            courseArr = course;
        } else if (typeof course === "string" && course.trim() !== "") {
            courseArr = course.split(",").map(c => c.trim());
        }

        let courseIds = [];
        if(courseArr.length > 0){
            courseIds = await Promise.all(
                courseArr.map(async (coursename) => {
                    let courseDoc = await Course.findOne(
                        {
                            name : coursename.toLowerCase()
                        }
                    )

                    if(!courseDoc){
                        courseDoc = await Course.create({ name : coursename.toLowerCase() })
                    }
                    return courseDoc?._id
                })
            )
        }

        await User.findOneAndUpdate(
            { 
                phone
            },
            {
                name : name?.toLowerCase(),
                email: email?.toLowerCase(),
                country : countryDoc?._id,
                state : stateDoc?._id,
                city : cityDoc?._id,
                course : courseIds
            },
            {
                upsert : true, new : true , setDefaultsOnInsert : true
            }
        )

    }

    return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    {},
                    "All students uploaded successfully"
                )
            )
})

export {createStudent, fileUplodeOnMongoDB}