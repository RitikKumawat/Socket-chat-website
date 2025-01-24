import {create} from "zustand";

const useConversation = create((set)=>({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation)=> set({selectedConversation}),
    messages:[],
    setMessages: (messages)=>set({messages}),
    unreadMessages:[],
    setUnreadMessages:(unreadMessages)=>set({unreadMessages}),
    clearUnreadMessages: (conversationId) =>
        set((state) => ({
          unreadMessages: state.unreadMessages.filter(
            (msg) => msg?.senderId !== conversationId
          ),
        })),
}))

export default useConversation;