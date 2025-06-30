import express from 'express';
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import { connectDB } from "./lib/db.js";
import dotenv from 'dotenv'
import { protectRoute } from './middleware/auth.middleware.js';
import cors from 'cors'
dotenv.config()

const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:5173",
    credentials:true
}))

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
app.listen(5001,()=>{
    console.log('Server is running on port 50001')
    connectDB();
    
})
