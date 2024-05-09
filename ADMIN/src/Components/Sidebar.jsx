import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiFillHome } from "react-icons/ai";
import { RiShoppingBag2Fill } from "react-icons/ri";
import { HiMiniUsers } from "react-icons/hi2";
import { MdDeliveryDining } from "react-icons/md";
import logo from '../Assets/icon.png'

const Sidebar = () => {
    const { pathname } = useLocation(); // Get the current pathname

    if (pathname === '/login') {
        return (
            <div></div>
        )
    }
    
  return (
    <div className='p-2 h-screen bg-LightGrey fixed top-0 left-0'>
        <div className="p-2 flex flex-col items-center h-full w-32 bg-white shadow-lg rounded-2xl ">
            <div className="h-36 bg-white">
                <img src={logo} alt="Adeego" className="w-28 h-28 text-DeepGreen bg-DeepGreen rounded-2xl"/>
            </div>
            <div className="flex flex-col bg-white text-sm font-extrabold mb-7">
                <Link className={`p-2 no-underline flex flex-row items-center mb-3
                    ${pathname === '/' ? 'bg-DeepGreen text-LightGrey rounded-lg h-6' : 'text-DarkGrey h-6 hover:bg-LightGrey rounded-lg'}`} to={'/'}>
                    <AiFillHome className=''/>
                    <h3 className=' ml-1'>Home</h3>
                </Link>
                <Link className={`p-2 no-underline flex flex-row items-center mb-3
                    ${pathname === '/products' ? 'bg-DeepGreen text-LightGrey rounded-lg h-6' : 'text-DarkGrey h-6 hover:bg-LightGrey rounded-lg'}`} to={'/products'}>
                    <RiShoppingBag2Fill />
                    <h3 className=' ml-1'>Products</h3>
                </Link>
                <Link className={`p-2 no-underline flex flex-row items-center mb-3
                    ${pathname === '/orders' ? 'bg-DeepGreen text-LightGrey rounded-lg h-6' : 'text-DarkGrey h-6 hover:bg-LightGrey rounded-lg'}`} to={'/orders'}>
                    <MdDeliveryDining />
                    <h3 className=' ml-1'>Orders</h3>
                </Link>
                <Link className={`p-2 no-underline flex flex-row items-center mb-80
                    ${pathname === '/customers' ? 'bg-DeepGreen text-LightGrey rounded-lg h-6' : 'text-DarkGrey h-6 hover:bg-LightGrey rounded-lg'}`} to={'/customers'}>
                    <HiMiniUsers />
                    <h3 className=' ml-1'>Customers</h3>
                </Link>
                <Link className={`p-2 no-underline flex flex-row items-center
                    ${pathname === '/logout' ? 'bg-DeepGreen text-LightGrey rounded-lg h-6' : 'text-DarkGrey h-6 hover:bg-LightGrey rounded-lg'}`} to={'/logout'}>
                    <HiMiniUsers />
                    <h3 className=' ml-1'>Logout</h3>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Sidebar