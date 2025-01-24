import React, { useEffect } from "react";
import profile from "../../assets/profile.webp";
import { useSelector } from "react-redux";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";
const Message = ({ message }) => {
  const { authUser } = useSelector((state) => state.auth);
  const { selectedConversation } = useConversation();
  console.log("selected conversation", selectedConversation);
  const formatedTime = extractTime(
    message.newMessage ? message.newMessage.createdAt : message.createdAt
  );
  const fromMe = message.newMessage
    ? message.newMessage.senderId
    : message.senderId === authUser._id;
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePic
    : selectedConversation?.profilePic;
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";
  console.log("new MEEESSAG", message.newMessage);
  // const shouldSee = message.newMessage.receiverId === selectedConversation
  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind css chat bubble" src={profilePic} />
        </div>
      </div>
      <div
        className={`chat-bubble text-white  ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        {message.newMessage ? message.newMessage.message : message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formatedTime}
      </div>
    </div>
  );
};

export default Message;
