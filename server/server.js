require("dotenv").config()

const express = require('express');
const app = express();
const authRouter = require('./router/auth-router');
const contactRoute = require('./router/contact-router');
const connectDb=require("./utlis/db")

const errorMiddleware = require('./middlewares/error-middleware');

app.use(express.json())   // middleware
app.use("/api/form",contactRoute)


// Register the router with the correct path
app.use('/api/auth', authRouter);

app.use(errorMiddleware);

const PORT = 5000;
connectDb().then(()=>{
app.listen(PORT, () => {
    console.log(`server is running on PORT: ${PORT}`);
});
})
