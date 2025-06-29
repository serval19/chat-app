import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import SidebarSkeleton from './skeletons/SidebarSkeleton';

const Sidebar = () => {
  const { getUsers, users,selectedUser,setSelectedUser,isUsersLoading}=useChatStore();
  const onlineUsers=[]
  useEffect(()=>{
    getUsers()
  },[getUsers])
  if(isUsersLoading) return
  return (
    <div>Sidebar</div>
  )
}

export default Sidebar