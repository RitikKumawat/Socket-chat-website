import { useState } from "react"
import useConversation from "../zustand/useConversation";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";


const useSendMessage = ()=>{
    const [loading,setLoading] = useState(false);
    const {messages,setMessages,selectedConversation} = useConversation();
    const {authUser} = useSelector((state)=>state.auth);
    const token = authUser.token;
    const fetchOptions = {
        method:"POST",
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
    const sendMessage = async(message)=>{
        setLoading(true);
        try {
            const res = await fetch(`http://localhost:5000/api/messages/send/${selectedConversation._id}`,{
                method:"POST",
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({message})
            })
            const data = await res.json();
            if(data.error){
                throw new Error(data.error)
            }
            console.log("Messages",messages)
            setMessages([...messages, data]);
        } catch (error) {
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }
    return {loading,sendMessage};
}
export default useSendMessage;