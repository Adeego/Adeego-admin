import React from 'react'
import Search from './ProductSearch'
import OrderList from './OrderList'

function CreateOrderComp() {
  return (
    <div className=' h-screen flex flex-1 justify-center items-center'>
        <div className=' container flex flex-row justify-center items-center h-[400px] w-5/6'>
            <div className=' w-1/2 h-full justify-center border-2 border-black'>
                <Search />
            </div>
            <div className=' w-1/2 h-full justify-center border-2 border-black'>
                <OrderList />
            </div>
        </div>
    </div>
  )
}

export default CreateOrderComp