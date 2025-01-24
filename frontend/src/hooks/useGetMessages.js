import { useEffect, useState } from "react"
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const useGetMessages = ()=>{
    const [loading,setLoading] = useState(false);
    const {messages,setMessages,selectedConversation} = useConversation();
    const {authUser} = useSelector((state)=>state.auth);
    const token = authUser.token;
    useEffect(()=>{
        const getMessages = async()=>{
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:5000/api/messages/${selectedConversation._id}`,{
                    method:"GET",
                    headers:{
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                }
                });
                const data = await res.json();
                if(data.error) throw new Error(data.error)
                setMessages(data);
            } catch (error) {
                toast.error(error.messages);
            }finally{
                setLoading(false);
            }
        }
        if(selectedConversation?._id) getMessages()
    },[selectedConversation?._id,setMessages])
    return {messages,loading}
}

export default useGetMessages;