import React, { useEffect } from 'react'
import CustomersTable from '../Components/Customers/CustomersTable'
import staffStore from '../Store/UserStore'
import { useNavigate } from 'react-router-dom'

const Customers = () => {
  const staff = staffStore((state) => state.staff)
  const navigate = useNavigate();

  useEffect(() => {
    if (staff == null){
      navigate('/login')
    }
  }, [staff])

  return (
    <div className=' pt-2 px-5 w-full bg-LightGrey items-center'>
      <section className='bg-LightGrey p-1 m-1 h-18 flex justify-between w-full'>
        <div className='h-16 w-1/3 m-2 p-1 rounded-lg shadow-md bg-white'></div>
        <div className='h-16 w-1/3 m-2 p-1 rounded-lg shadow-md bg-white'></div>
        <div className='h-16 w-1/3 m-2 p-1 rounded-lg shadow-md bg-white'></div>
      </section>
      <div className=' bg-white rounded-xl  w-full shadow-lg'>
        <CustomersTable />
      </div>
    </div>
  )
}

export default Customers