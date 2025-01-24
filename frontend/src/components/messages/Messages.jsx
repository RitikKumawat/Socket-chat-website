import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeleton/MessageSkeleton";
import useListenMessages from "../../hooks/useListenMessages";
import useConversation from "../../zustand/useConversation";

const Messages = ({ id }) => {
  const { messages, loading } = useGetMessages();

  console.log("messges:", messages);
  // const{messages,loading} = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages, messages.newMessage]);

  console.log("messages", messages);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message, idx) => (
          <div key={idx} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
