import { useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const useGetConversation = ()=>{
    const [loading,setLoading] = useState(false);
    const {authUser} = useSelector((state)=>state.auth);
    const [conversations,setConversation] = useState([]);
    const token = authUser.token;
    const fetchOptions = {
        method:"GET",
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };
    useEffect(()=>{
        const getConvo = async()=>{
            setLoading(true);
            try {
                await fetch('http://localhost:5000/api/users/',fetchOptions)
                .then(response=>{
                    if(!response.ok){
                        throw new Error("network response was not okay");
                    }
                    return response.json();
                })
                .then(data=>{
                    const filteredUsers = data.filteredUsers;
                    console.log("FILTEr users frontend",filteredUsers);
                    setConversation(filteredUsers);
                })
                
            } catch (error) {
                console.log("ERROR",error);
                toast.error(error.message);
            }finally{
                setLoading(false);
            }
        }
        getConvo();
    },[])
    return {loading,conversations}
}

export default useGetConversation;