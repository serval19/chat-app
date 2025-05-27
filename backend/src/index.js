import express from 'express';
import authRoutes from './routes/auth.route.js'
import { connectDB } from "./lib/db.js";
import dotenv from 'dotenv'
dotenv.config()
const app=express()

app.use("/api/auth",authRoutes)
app.listen(5001,()=>{
    console.log('Server is running on port 50001')
    connectDB();
    
})
