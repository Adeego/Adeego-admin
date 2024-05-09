import React from 'react'
import staffStore from '../Store/UserStore'
import { useNavigate } from 'react-router-dom'

export default function Logout() {
    const logout = staffStore((state) => state.clearStaff)
    const staff = staffStore((state) => state.staff)
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();

        navigate('/login')

        alert('You have logout successfuly!')
    }

  return (
    <div className='flex justify-center items-center w-screen'>
       <div className='flex flex-col justify-center items-center'>
            <h2 className=' text-center mb-3'>You are about to logout!</h2>
            <button className='bg-Red h-8 w-36 text-sm font-bold rounded-xl text-LightGrey' onClick={handleLogout} >Logout</button>
        </div> 
    </div>
    
  )
}
