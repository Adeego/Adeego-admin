import React, { useEffect } from 'react'
import staffStore from '../Store/UserStore'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const staff = staffStore((state) => state.staff)
  const navigate = useNavigate();

  useEffect(() => {
    if (staff == null){
      navigate('/login')
    }
  }, [staff])

  return (
    <div className='p-2 grid w-full bg-LightGrey'>
      <section className='bg-LightGrey p-1 m-1 h-48 flex justify-between w-full'>
        <div className='m-2 p-1 w-3/5 gap-5 bg-white shadow-md rounded-lg'></div>
        <div className='m-2 p-1 w-3/5 gap-5 bg-white shadow-md rounded-lg'></div>
        <div className='m-2 p-1 w-3/5 gap-5 bg-white shadow-md rounded-lg'></div>
      </section>
      <section className='bg-LightGrey p-2 m-1 h-48 flex justify-between w-full'>
        <div className='m-2 p-1 w-3/5 bg-white shadow-md rounded-lg'></div>
        <div className='m-2 p-1 w-3/5 bg-white shadow-md rounded-lg'></div>
        <div className='m-2 p-1 w-3/5 bg-white shadow-md rounded-lg'></div>
        <div className='m-2 p-1 w-3/5 bg-white shadow-md rounded-lg'></div>
      </section>
      <section className='bg-LightGrey p-2 m-1 h-80 flex justify-between w-full '>
        <div className='m-2 p-1 w-3/5 bg-white shadow-md rounded-lg'></div>
        <div className='m-2 p-1 w-3/5 bg-white shadow-md rounded-lg'></div>
      </section>
    </div>
  )
}

export default Home