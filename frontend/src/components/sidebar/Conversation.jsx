import React from 'react'
import imag from "../../assets/profile.webp"
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/SocketContext';
const Conversation = ({conversation,lastIdx,emoji,unreadCount}) => {
    const {selectedConversation,setSelectedConversation,clearUnreadMessages} = useConversation();
    console.log("unreadCOunt",unreadCount);
    
    const isSelected = selectedConversation?._id===conversation._id;
    const {onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(conversation._id)
    const handleClick=()=>{
        setSelectedConversation(conversation);
        clearUnreadMessages(conversation?._id); 
    }
    return (
    <>
        <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
        ${isSelected ?"bg-sky-500":""}`} onClick={handleClick}>
            <div className={`avatar ${isOnline ? "online":""}`}>
                <div className='w-12 rounded-full'>
                    <img src={conversation.profilePic} alt='user avatar'/>
                </div>
            </div>
        
        <div className='flex flex-col flex-1'>
            <div className='flex gap-3 justify-between'>
                <p className='font-bold text-gray-200'>{conversation.fullName}</p>
                <span className='text-xl'>{emoji}</span>
                {unreadCount > 0 && (
              <div className="badge badge-error text-white text-sm font-semibold px-2 py-1">
                {unreadCount}
              </div>
            )}
            </div>
        </div>
        </div>
        {!lastIdx && <div className='divider my-0 py-0 h-1'></div>}

    </>
  )
}

export default Conversation