import express from 'express';
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import { connectDB } from "./lib/db.js";
import dotenv from 'dotenv'
import { protectRoute } from './middleware/auth.middleware.js';
import cors from 'cors'
import { app,server} from './lib/socket.js'
dotenv.config()



app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:5173",
    credentials:true
}))

app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)
server.listen(5001,()=>{
    console.log('Server is running on port 50001')
    connectDB();
    
})
