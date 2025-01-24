import { useEffect, useState } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/notification.mp3";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages, selectedConversation, unreadMessages, setUnreadMessages } = useConversation();
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  // Listen for user interaction to enable sound play
  const handleUserInteraction = () => {
    setHasUserInteracted(true);
  };

  useEffect(() => {
    // Add event listener for user interaction
    window.addEventListener("click", handleUserInteraction);

    return () => {
      window.removeEventListener("click", handleUserInteraction);
    };
  }, []);

  useEffect(() => {
    if (socket) {
      const handleNewMessage = (newMessage) => {
        newMessage.shouldShake = true;
        if (hasUserInteracted) {
          const sound = new Audio(notificationSound);
          sound.play();
        }
        console.log("new message", newMessage);

        if (newMessage?.senderId === selectedConversation?._id) {
          setMessages([...messages, newMessage]);
        } else {
          setUnreadMessages([...unreadMessages, newMessage]);
        }
      };

      socket.on("newMessage", handleNewMessage);

      return () => {
        socket.off("newMessage", handleNewMessage);
      };
    }

    return () => {
      if (socket) {
        socket.off("newMessage");
      }
    };
  }, [socket, messages, unreadMessages, setMessages, setUnreadMessages, selectedConversation?._id, hasUserInteracted]);

};

export default useListenMessages;
