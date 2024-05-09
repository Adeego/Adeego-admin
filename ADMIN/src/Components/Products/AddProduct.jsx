import React, { useState } from 'react'
import app from '../../../firebaseConfig';
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

function AddProduct ({ handleFalse }) {
    // State variables for adding new product
    
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState('');
    const [size, setSize] = useState('');
    const [buyPrice, setBuyPrice] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [keywords, setKeywords] = useState([]);

    const categoryOptions = [
      {category: ''},
      {category: 'DryFoods'},
      {category: 'Drinks'},
      {category: 'Dairy'},
      {category: 'Snacks'},
      {category: 'OilButter'},
      {category: 'OtherFoods'},
      {category: 'Gas'},
      {category: 'PersonalCare'},
      {category: 'Cleaning'},
      {category: 'BabyCare'},
      {category: 'HomeM'},
      {category: 'OtherE'},
    ];

    const stockOptions = [
      {stock: ''},
      {stock: 'In stock'},
      {stock: 'Out of stock'},
    ];

    const handleName = (e) => {
      setName(e.target.value);
    }

    const handleCategory = (e) => {
      setCategory(e.target.value);
    }

    const handleStock = (e) => {
      setStock(e.target.value);
    }

    const handleSize = (e) => {
      setSize(e.target.value);
    }

    const handleBuyPrice = (e) => {
      setBuyPrice(e.target.value);
    }

    const handlePrice = (e) => {
      setPrice(e.target.value);
    }

    const handleImage = (e) => {
      setImage(e.target.value);
    }

    const handleDescription = (e) => {
      setDescription(e.target.value);
    }

    const handleKeywords = (e) => {
      setKeywords(e.target.value);
    }

    // Clear input fields
    const clearInputFields = () => {
      setName('');
      setCategory('');
      setStock('');
      setSize('');
      setBuyPrice('');
      setPrice('');
      setImage('');
      setDescription('');
      setKeywords([]);
    }

    // Add new product
    const addNewProduct = async () => {
        try {
          const db = getFirestore(app);
          const productRef = collection(db, 'Products');
          const productData = {
            Name: name,
            Category: category,
            Stock: stock,
            Size: size,
            BuyPrice: parseFloat(buyPrice),
            Price: parseFloat(price),
            Image: image,
            Description: description,
            Keywords: keywords,
            CreatedAt: serverTimestamp(),
            UpdatedAt: serverTimestamp(),
          };
      
          const newProductRef = await addDoc(productRef, productData);
          console.log('Document written with ID: ', newProductRef.id);

          clearInputFields();
          handleFalse();
          
          return newProductRef.id;
        } catch (error) {
            handleFalse();
            console.error(error);
            throw error;
        }
    };

  return (
    <div className='w-full'>
      <div className='bg-transparent absolute top-0 bottom-0 left-0 right-0'>
        <div className='p-2 h-full backdrop-blur-lg flex justify-center items-center'>
          <div className='flex flex-col h-3/6 w-3/6 bg-DeepGreen p-5 justify-between rounded-2xl'>
            <div className='flex flex-row h-10 w-full justify-between mt-10'>
              <input type="text" onChange={handleName} value={name} placeholder='Name' className='bg-LightGrey h-8 w-4/12 outline-none text-CharcoalGrey p-2 rounded-xl' />
              {/* <input type="text" onChange={handleCategory} value={category} placeholder='Category' className='bg-LightGrey h-8 w-4/12 outline-none text-CharcoalGrey p-2 rounded-xl' /> */}
              <select onChange={handleCategory} className='bg-LightGrey h-8 w-4/12 outline-none text-CharcoalGrey p-2 rounded-xl'>
                {categoryOptions.map(option => (
                  <option key={option.category} value={option.category}>{option.category}</option>
                ))}
              </select>
              {/* <input type="text" onChange={handleStock} value={stock} placeholder='Stock' className='bg-LightGrey h-8 w-3/12 outline-none text-CharcoalGrey p-2 rounded-xl' /> */}
              <select onChange={handleStock} className='bg-LightGrey h-8 w-3/12 outline-none text-CharcoalGrey p-2 rounded-xl'>
                {stockOptions.map(option => (
                  <option key={option.stock} value={option.stock}>{option.stock}</option>
                ))}
              </select>
            </div>
            <div className='flex flex-row h-10 w-full justify-between'>
              <input type="text" onChange={handleSize} value={size} placeholder='Size' className='bg-LightGrey h-8 w-4/12 outline-none text-CharcoalGrey p-2 rounded-xl' />
              <input type='number' onChange={handleBuyPrice} value={buyPrice} placeholder='Buy Price' className='bg-LightGrey h-8 w-4/12 outline-none text-CharcoalGrey p-2 rounded-xl' />
              <input type='number' onChange={handlePrice} value={price} placeholder='Sell Price' className='bg-LightGrey h-8 w-3/12 outline-none text-CharcoalGrey p-2 rounded-xl' />
            </div>
            <div className='flex flex-row h-10 w-full justify-between'>
              <input type="text" onChange={handleImage} value={image} placeholder='Image' className='bg-LightGrey h-8 w-4/12 outline-none text-CharcoalGrey p-2 rounded-xl' />
              <input type="text" onChange={handleDescription} value={description} placeholder='Description' className='bg-LightGrey h-8 w-4/12 outline-none text-CharcoalGrey p-2 rounded-xl' />
              <input type="text" onChange={handleKeywords} value={keywords} placeholder='Keywords' className='bg-LightGrey h-8 w-3/12 outline-none text-CharcoalGrey p-2 rounded-xl' />
            </div>
            <div className='flex flex-row h-10 w-full justify-between'>
              <button className='bg-Red h-8 w-36 text-sm font-bold rounded-xl text-LightGrey' onClick={() => handleFalse()}>CANCEL</button>
              <button className='bg-Gold h-8 w-36 text-sm font-bold rounded-xl text-CharcoalGrey' onClick={() => addNewProduct()}>ADD PRODUCT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default AddProduct
