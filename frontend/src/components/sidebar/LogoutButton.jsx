import React from 'react'
import {BiLogOut} from "react-icons/bi"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/operations/authApi';
const LogoutButton = () => {
  const {loading} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  return (
    <div className='mt-auto'>
        {/* {!loading ? (
          <BiLogOut onClick={()=>dispatch(logout(navigate))} className="w-6 h-6 text-white cursor-pointer"/>
        ):(
          <span className='loading loading-spinner'></span>
        )} */}
        <BiLogOut onClick={()=>dispatch(logout(navigate))} className="w-6 h-6 text-white cursor-pointer"/>
    </div>
  )
}

export default LogoutButton