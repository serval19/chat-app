import {create} from 'zustand'
import {axiosInstance} from '../lib/axios.js'

export const useAuthStore= create((set)=>({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,

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
    // Remove the finally block completely
}
}))