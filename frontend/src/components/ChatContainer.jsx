import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { useEffect } from 'react'

const ChatContainer = () => {
  const {messages,getMessages,isMessagesLoading,selectedUser}=useChatStore()
  useEffect(()=>{
    getMessages(selectedUser._id)
  },[selectedUser._id,getMessages])
  if(isMessagesLoading) return <div>Loading..</div>
  return (
    <div className='flex-2 flex flex-col overflow-auto'>
      <ChatHeader />
    </div>
  )
}

export default ChatContainer