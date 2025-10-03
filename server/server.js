require("dotenv").config()

const express = require('express');
const app = express();
const cors = require('cors');
const authRouter = require('./router/auth-router');
const contactRoute = require('./router/contact-router');
const serviceRoute = require("./router/service-router")
const adminRoute = require("./router/admin-router")                    // 39.2
const connectDb=require("./utlis/db")

const errorMiddleware = require('./middlewares/error-middleware');

const corsOptions = {
   origin:["http://localhost:5173","http://localhost:5174"],
   methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
   credentials:true,
}

// lets handle cors
app.use(cors(corsOptions))    //yahan pr tum chat gpt bhi use kar sakte ho ananad

app.use(express.json())   // middleware
app.use("/api/form",contactRoute)




// Register the router with the correct path
app.use('/api/auth', authRouter);
app.use('/api/data', serviceRoute);


// let us define admin route
app.use("/api/admin",adminRoute)                               // 39.2

app.use(errorMiddleware);

const PORT = 5000;
connectDb().then(()=>{
app.listen(PORT, () => {
    console.log(`server is running on PORT: ${PORT}`);
});
})
