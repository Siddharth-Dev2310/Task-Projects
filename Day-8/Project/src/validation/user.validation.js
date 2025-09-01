import {z} from "zod";

export const registerUserSchema = z.object(
    {
        name : z.string(),
        age : z.number(),
        course : z.string()
    }
)


