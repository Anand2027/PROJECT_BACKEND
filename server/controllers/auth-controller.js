const User = require("../models/user-model");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
    try {
        res
            .status(200)
            .send("Welcome to world's best MERN series by Technical Thapa using router !!!!!!!!!!  good boy");
    } catch (error) {
        console.log("error in home:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const register = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;

        // Check if user already exists
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(400).json({ message: "Email already exists" });
        } 

        //hash the password
        // const saltRounds = 10;                IN SAB KO HUM LOG PRE WALE ME user-schema.js ME KAR RAHE HAI
        // const hash_password = await bcrypt.hash(password, saltRounds);

        const userCreated = await User.create({
            username,
            email,
            phone,
            password
        });

        return res.status(201).json({ message: "User registered successfully", msg: userCreated ,
             token: await userCreated.generateAToken(),
             userId: userCreated._id.toString() });
    } catch (error) {
       next(error);
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const userExist = await User.findOne({ email: email });
        if (!userExist  || !userExist.password) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Check password
        // const user = await bcrypt.compare(password, userExist.password);
        const user = await userExist.comparePassword(password);


        if (user) {
           res.status(200).json({ message: "Login successful", 
            token: await userExist.generateAToken(), 
            userId: userExist._id.toString() });
        }
        else {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        } catch (error) {
        console.log("error in login:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { home, register, login };

