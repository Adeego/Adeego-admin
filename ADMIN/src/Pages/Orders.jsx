import React, { useEffect } from 'react'
import NewOrder from '../Components/Orders/NewOrder';
import OrdersTable from '../Components/Orders/OrdersTable';
import { useNavigate } from 'react-router-dom';
import staffStore from '../Store/UserStore';

const Orders = () => {
  const staff = staffStore((state) => state.staff)
  const navigate = useNavigate();

  useEffect(() => {
    if (staff == null) {
      navigate('/login')
    }
  }, [])
  

  return (
    <div className='bg-LightGrey items-center'>
      <div className='h-12 justify-center mt-3'>
      </div>
      <div className=' bg-white rounded-xl  w-full shadow-lg'>
        <OrdersTable/>
      </div>
    </div>
  )
}

export default Orders