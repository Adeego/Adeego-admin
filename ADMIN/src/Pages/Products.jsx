import React, { useState, useEffect } from 'react'
import ProductsTable from '../Components/Products/ProductsTable'
import AddProduct from '../Components/Products/AddProduct';
import staffStore from '../Store/UserStore';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [addProduct, setAddProduct] = useState(false);
  const staff = staffStore((state) => state.staff)
  const navigate = useNavigate();

  useEffect(() => {
    if (staff == null){
      navigate('/login')
    }
  }, [staff])

  const handleFalse = () => {
    setAddProduct(false);
  }

  const handleTrue = () => {
    setAddProduct(true);
  }

  const handleJsonredirect = () => {
    navigate('/json')
  }

  return (
    <div className=' pt-2 px-5 w-full bg-LightGrey items-center'>
      <div className='flex justify-end items-center h-16 p-3 w-full'>
        <button className='bg-DeepGreen text-LightGrey h-8 w-36 text-sm font-bold rounded-xl' onClick={handleTrue}>ADD PRODUCT</button>
      </div>
      <div className='flex justify-end items-center h-16 p-3 w-full'>
        <button className='bg-DeepGreen text-LightGrey h-8 w-36 text-sm font-bold rounded-xl' onClick={handleJsonredirect}>JSON</button>
      </div>
      <div className=' bg-white rounded-xl  w-full shadow-lg'>
        <ProductsTable/>
      </div>

      {addProduct && (
        <AddProduct handleFalse={handleFalse}/>
      )}
    </div>
  )
}

export default Products