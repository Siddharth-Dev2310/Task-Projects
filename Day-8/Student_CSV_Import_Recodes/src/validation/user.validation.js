import { z } from "zod";

export const fileUplodeOnMongoDBValidation = z.object({
        name: z
                .string()
                .min(1, "Name is required"),

        email: z
                .string()
                .email("Invalid email address"),

        phone: z
                .string()
                .length(10, "Phone number must be exactly 10 digits"),
        country: z
                .string()
                .min(1, "Country is required"),

        state: z
                .string()
                .min(1, "State is required"),
        city: z
                .string()
                .min(1, "City is required"),

        course: z
                .array(z
                        .string()
                        .min(1, "Course name is required"))
                        .min(1, "At least one course is required")
});