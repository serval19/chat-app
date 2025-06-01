import express from 'express';
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.route.js'
import { connectDB } from "./lib/db.js";
import dotenv from 'dotenv'
import { protectRoute } from './middleware/auth.middleware.js';
dotenv.config()

const app=express()
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.listen(5001,()=>{
    console.log('Server is running on port 50001')
    connectDB();
    
})
