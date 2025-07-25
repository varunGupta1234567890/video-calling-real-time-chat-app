import dotenv from "dotenv"
dotenv.config({
    path:'./.env'
})
// import connectdb from "./db/index.js"
// import app from './app.js';

import connectdb from "./db/index.js"
import app from './app.js';


//db wale index me connectdb function bnaya h or use main index me call kiya h
connectdb()
.then(() => {
    app.listen(process.env.PORT || 51, () => {
        console.log(` Server is running at port : "http://localhost:${process.env.PORT}"`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!!",err);
})