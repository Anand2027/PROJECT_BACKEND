const { z } = require("zod");

const signupSchema = z.object({
    username: z
        .string({ required_error: "Username is required" })
        .trim()
        .min(3, { message: "Username must be at least 3 characters long" })
        .max(20, { message: "Username must be at most 20 characters long" }),
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(5, { message: "Email must be at least 5 characters long" })
        .max(255, { message: "Email must be at most 255 characters long" }),
    phone: z.string({ required_error: "Phone is required" })
        .trim()
        .min(10, { message: "Phone must be at least 10 digits" })
        .max(15, { message: "Phone must be at most 15 digits" }),
    password: z
        .string({ required_error: "Password is required" })
        .min(6, { message: "Password must be at least 6 characters long" })
        .max(255, { message: "Password must be at most 255 characters long" }),
});

module.exports =  signupSchema ;
