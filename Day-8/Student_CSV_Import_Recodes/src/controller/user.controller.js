import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHendler } from "../utils/asyncHendler.js";
import { User, City, Country, State, Course } from "../models/export.model.js";
import { fileUplodeOnMongoDBValidation } from "../validation/user.validation.js";
import csv from "csvtojson";
import { toLowerCase } from "zod";

const createStudent = asyncHendler(async (req, res) => {
  //!: collect The Data Form The Student like {Name, Email, Phone, Country, State, City, Course} -> req.Body
  //?: Check The Validation user Can Empty Filed Can Pass Or Not?
  //*: If The Student Alreedy Existing The Given the Error
  //TODO: if The User Can Not Existing Create The New Student
  //?: Create The Object Of the Student Date
  //!: If The Student Object Can Not Create Given The Error (Somthing Went wrong)
  //*: And Given The User Return The Object

  const { name, email, phone, country, state, city, course } = req.body;

  if ([name, email, phone].some((filed) => filed?.trim() === "")) {
    throw new ApiError(400, "All Fileds Are Requied");
  }

  const countryDoc = await Country.create({
    name: country?.toLowerCase(),
  });
  const stateDoc = await State.create({
    name: state?.toLowerCase(),
  });
  const cityDoc = await City.create({
    name: city?.toLowerCase(),
  });

  if (!countryDoc || !stateDoc || !cityDoc) {
    throw new ApiError(400, "Invalid country, state, or city name");
  }

  let courseIds = [];
  if (Array.isArray(course)) {
    courseIds = await Promise.all(
      course.Map(async (coursename) => {
        let courseDoc = await Course.findOne({
          name: coursename.toLowerCase(),
        });

        if (!courseDoc) {
          courseDoc = await Course.create({ name: coursename.toLowerCase() });
        }

        return courseDoc?._id;
      })
    );
  }

  const existingUser = await User.findOne({
    $or: [{ name }, { email }],
  });

  if (existingUser) {
    throw new ApiError(402, "User Alredy Existing");
  }

  const user = await User.create({
    name: name?.toLowerCase(),
    email: email?.toLowerCase(),
    phone,
    country: countryDoc?._id,
    state: stateDoc?._id,
    city: cityDoc?._id,
    course: courseIds,
  });

  const createdUser = await User.findById(user?._id)
    .select("name email phone")
    .populate({
      path: "country",
      select: "name",
    })
    .populate({
      path: "state",
      select: "name country",
    })
    .populate({
      path: "city",
      select: "name state",
    })
    .populate({
      path: "course",
      select: "name",
    });

  if (!createdUser) {
    throw new ApiError(500, "Somting Went Wrong");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createdUser, "Student Scussfully Created"));
});

/*

const fileUplodeOnMongoDB = asyncHendler(async (req, res) => {
  //! : req.body -> File;
  //? : can convte CSV into The extenstion In the JSON
  //* : can store The file in mongoDb fildes
  //TODO : desture The whole Data
  //! : store in The mongoDB data
  //? : return The Responce

  const filePath = req.file?.path;

  const students = await csv().fromFile(filePath);

  for (const student of students) {
     const {name, email, phone, country, state, city, course} = student;

    if (!phone || phone.trim() === "") {
      continue;
    }

    const countryDoc =
      (await Country.findOne({
        name: country?.toLowerCase(),
      })) ||
      (await Country.create({
        name: country?.toLowerCase(),
      }));

    const stateDoc =
      (await State.findOne({
        name: state?.toLowerCase(),
      })) ||
      (await State.create({
        name: state?.toLowerCase(),
      }));

    const cityDoc =
      (await City.findOne({
        name: city?.toLowerCase(),
      })) ||
      (await City.create({
        name: city?.toLowerCase(),
      }));

    let courseIds = [];
    if (Array.isArray(course)) {
      courseIds = await Promise.all(
        course.Map(async (coursename) => {
          if (!coursename) return null;

          const courseDoc =
            (await Course.findOne({
              name: coursename?.toLowerCase(),
            })) ||
            (await Course.create({
              name: coursename?.toLowerCase(),
            }));

          return courseDoc._id;
        })
      );

      courseIds = courseIds.filter(Boolean);
    } else if (course) {
      const courseDoc =
        (await Course.findOne({
          name: course?.toLowerCase(),
        })) ||
        (await Course.create({
          name: course?.toLowerCase(),
        }));

      courseIds = [courseDoc._id];
    }

    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      const mergedCourses = Array.from(
        new Set([...(existingUser.course || []), ...courseIds])
      );

      await User.findByIdAndUpdate(
        existingUser?._id,
        {
          name: name?.toLowerCase(),
          email: email?.toLowerCase(),
          country: countryDoc?._id,
          state: stateDoc?._id,
          city: cityDoc?._id,
          course: mergedCourses,
        },
        {
          new: true,
        }
      );
    } else {
      await User.create({
        name: name?.toLowerCase(),
        email: email?.toLowerCase(),
        phone,
        country: countryDoc?._id,
        state: stateDoc?._id,
        city: cityDoc?._id,
        course: courseIds,
      });
    }
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "All students uploaded successfully"));
});

*/

const fileUplodeOnMongoDB = asyncHendler( async ( req, res) => {
  //! : File Path -> Req.Body
  //? : Convet The File PAth usin The CSv Parser Also The Conver Into THe JSon 
  //* : Can Sotre The Chaches like The {City, State, Country, courses} Reduces DB Calles
  //TODO : Make The async Funcation To Check The Exsiting Data Are or Not ? 
  //! : If The Can Not Have The Data SO Create The Array
  //? : And All The Students Can Store In To The Student For Loop 
  //* :  Get the Country, City, State ids using The Set
  //TODO : And For The CouresIds Can old System Can Use Get The Whole The IDS Can Store In TO Array Using Set 
  //! : Push The Whole The Data into The Created Array 
  //* : Store In The mongoDB 

  const filePath = req.file?.path;
  const students = await csv().fromFile(filePath);
  
  const countryCache = new Map();
  const stateCache = new Map();
  const cityCache = new Map();  
  const courseCache = new Map();

  const prelodedData = async () => {
    const [countries,  states, cities, courses] = await Promise.all(
      [
        Country.find({}, "name"),
        State.find({}, "name"),
        City.find({}, "name"),
        Course.find({}, "name")
      ]
    );

    countries.forEach(c => countryCache.set(c.name, c._id));
    states.forEach(st => stateCache.set(st.name, st._id));
    cities.forEach(ci => cityCache.set(ci.name, ci._id));
    courses.forEach(co => courseCache.set(co.name, co._id));
  }

  await prelodedData();

  let bulkOps = [];

  for(let student of students){
    let {name, email, phone, country, state, city, course} = student;
    if (!phone?.trim()) continue;

    let countryId = countryCache.get(country?.toLowerCase());
    if(!countryId){
      const doc = await Country.create({name : country?.toLowerCase()})
      countryId = doc?._id;
      countryCache.set(country?.toLowerCase(), countryId);
    }

    let stateId = stateCache.get(state?.toLowerCase());
    if(!stateId){
      const doc = await State.create({name : state?.toLowerCase()})
      stateId = doc?._id;
      stateCache.set(state?.toLowerCase(), stateId);
    }

    let cityId = cityCache.get(city?.toLowerCase());
    if(!cityId){
      const doc = await City.create({name : city?.toLowerCase()})
      cityId = doc?._id;
      cityCache.set(city?.toLowerCase(), cityId);
    }

    let courseIds = [];
    const courseArr = Array.isArray(course) ? course : [course];

    for(let coursename of courseArr ){

      if(!coursename) continue;
      const lowerName = coursename.toLowerCase();

      let courseId = courseCache.get(lowerName);

      if(!courseId){
        const doc = await Course.create({name : lowerName});
        courseId = doc?._id;
        courseCache.set(lowerName, courseId);
      }
      
      courseIds.push(courseId);
    }

    bulkOps.push({
      updateOne: {
        filter : {phone},
        update : {
          $set : {
            name : name?.toLowerCase(),
            email : email?.toLowerCase(),
            country : countryId,
            state : stateId,
            city : cityId
          },
          $addToSet : { course : { $each : courseIds } }
        },
        upsert : true
      }
    })
  }

  if(bulkOps.length > 0){
    await User.bulkWrite(bulkOps)
  }

   return res
    .status(200)
    .json(
      new ApiResponse(200, {}, "All students uploaded successfully")
    );
}) 

export { createStudent, fileUplodeOnMongoDB };