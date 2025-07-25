import express from "express"
import cors from "cors" 
import cookieParser from "cookie-parser"

const app = express()
//isme express app ko setup karo
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true // cookies ko allow kro
}))

app.use(express.json({limit: "16kb"}))//jab json se data aaye express ko btane ke liye
app.use(express.urlencoded({extended: true, limit: "16kb"}))//jab url se data aaye
app.use(express.static("public"))//public assets ke liye eg images , favicon
app.use(cookieParser())//server se user ki cookies access karne ke liye 

//routes import
import userRouter from './routes/user.routes.js'
import chatRouter from './routes/chat.routes.js'
import authRouter from './routes/auth.routes.js'

app.use("/api/v1/users", userRouter)
app.use("/api/v1/chat", chatRouter)
app.use("/api/v1/auth", authRouter)

export default app