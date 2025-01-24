import React, { useEffect, useState } from 'react'
import Conversation from './Conversation'
import { useDispatch, useSelector } from 'react-redux'
// import { getUsers } from '../../services/operations/conversationApi';
import useGetConversation from '../../hooks/useGetConversation';
import { getRandomEmoji } from '../../utils/emojis';
import useListenMessages from '../../hooks/useListenMessages';
import useConversation from '../../zustand/useConversation';


const Conversations = () => {
  const {loading,conversations} = useGetConversation();
  const {unreadMessages} = useConversation();
  console.log("unreadmessages",unreadMessages);
  console.log("Conversations",conversations);
  useListenMessages();
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => {
        // Calculate unread message count for this conversation
        const unreadCount = unreadMessages?.filter(
          (msg) => msg?.senderId === conversation?._id
        ).length;

        return (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            emoji={getRandomEmoji()}
            unreadCount={unreadCount} // Pass unread count
            lastIdx={idx === conversations.length - 1}
          />
        );
      })}
      {loading ? <span className="loading loading-spinner mx-auto"></span> : null}
    </div>
  );
};

export default Conversations