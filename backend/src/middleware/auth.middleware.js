import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'
export const protectRoute= async (req, res, next)=>{
    try {
        const token=req.cookies.jwt
        if(!token){
            return res.status(401).json({message: "Unautorized- No token provided"}) //import cookie-parser app.use(cookieParser()) to be added in index.js
        }
        const decoded=jwt.verify (token, process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({message: "Invalid token"})
        }
        const user=await User.findById(decoded.userId).select("-password")
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        req.user=user
        next()
    } catch (error) {
        console.log("Error in protectRoute middleware",error.message)
        return res.status(500).json({message: "Internal server error"})
        
    }
}