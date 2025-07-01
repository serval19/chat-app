import {create} from 'zustand'
import {axiosInstance} from '../lib/axios.js'
import {toast} from 'react-hot-toast'

export const useAuthStore= create((set)=>({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    onlineUsers: [],

    checkAuth: async() => {
    try {
        const res = await axiosInstance.get("/auth/check")
        set({
            authUser: res.data,
            isCheckingAuth: false // Set both at the same time
        })
    } catch (error) {
        console.log("error in checkauth", error)
        set({
            authUser: null,
            isCheckingAuth: false // Set both at the same time
        })
    }
    
},
    signup: async(data)=>{
        set({isSigningUp: true})
        try {
            const res=await axiosInstance.post("/auth/signup",data)
            toast.success("Account created successfully")
            set({authUser: res.data})
            toast.success("Account created successfully")
            
        } catch (error) {
            toast.error(error.response.data.message)
            
        } finally{
            set({isSigningUp:false})
        }
        
    },
    logout: async()=>{
        try {
            await axiosInstance.post("/auth/logout")
            set({authUser: null})
            toast.success("logged out successfully")

        } catch (error) {
            toast.error(error.response.data.message)
            
        }
    },
    login: async(data)=>{
        set({isLoggingIn: true})
        try {
            const res=await axiosInstance.post("/auth/login",data)
            set({authUser: res.data})
            toast.success("login successful")
        } catch (error) {
            toast.error(error.response.data.message)

            
        }
        finally{
            set({isLoggingIn: false})
        }
    },
    updateProfile: async(data)=> {
        set({isUpdatingProfile: true})
        try {
            const res=await axiosInstance.put("/auth/update-profile",data)
            set({authUser: res.data})
            toast.success("Profile updated successfully")
        } catch (error) {
            console.log("error in updateProfile", error)
            toast.error(error.response.data.message)
            
            
        } finally{
            set({isUpdatingProfile: false})
        }
    },
})
)