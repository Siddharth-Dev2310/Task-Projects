import express from "express";
import cors from "cors"


const app = express();


app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

//Routes

import taskRouter from "./routes/taskmanger.route.js"

app.use("/api/v1/user-task", taskRouter);

export {app};