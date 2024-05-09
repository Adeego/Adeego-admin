import React, { useState } from 'react'
import { getFirestore, collection, doc, updateDoc } from 'firebase/firestore';
import app from '../../../firebaseConfig';

function EditProduct({handleEditFalse, product}) {
    // states for input fields
    const [name, setName] = useState(product.Name);
    const [category, setCategory] = useState(product.Category);
    const [stock, setStock] = useState(product.Stock);
    const [size, setSize] = useState(product.Size);
    const [buyPrice, setBuyPrice] = useState(product.BuyPrice);
    const [price, setPrice] = useState(product.Price);
    const [image, setImage] = useState(product.Image);
    const [description, setDescription] = useState(product.Description);
    const [keywords, setKeywords] = useState([]);
    
    //Functions to handle input fields changes
    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    const handleStockChange = (e) => {
        setStock(e.target.value);
    }

    const handleSizeChange = (e) => {
        setSize(e.target.value);
    }

    const handleBuyPriceChange = (e) => {
        setBuyPrice(e.target.value);
    }

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    }

    const handleImageChange = (e) => {
        setImage(e.target.value);
    }
    
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const handleKeywordsChange = (e) => {
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

    // Update the product details
    const handleApplyChanges = async () => {
        const fieldsToUpdate = {
          Name: name,
          Category: category,
          Stock: stock,
          Size: size,
          BuyPrice: parseFloat(buyPrice),
          Price: parseFloat(price),
          Image: image,
          Description: description,
          Keywords: keywords
        };

        try {
          const db = getFirestore(app);  
          // Update the product in Firestore
          await updateDoc(doc(db, 'Products', product.id), fieldsToUpdate);
    
          // Handle success (e.g., display a success message or navigate back)
          console.log('Product updated successfully!');
    
          // Clear input fields
          clearInputFields();
          // Call handleEditFalse if needed
          handleEditFalse();
        } catch (error) {
          // Handle errors (e.g., display an error message to the user)
          console.error('Error updating product:', error);
        }
    };

  return (
    <div className='w-full'>
        <div className='bg-transparent absolute top-0 bottom-0 left-0 right-0'>
            <div className='p-2 h-full backdrop-blur-xl flex justify-center items-center'>
                <div className='bg-DeepGreen w-2/4 h-96 rounded-lg shadow-lg'>
                    <div className='h-8 w-full bg-DeepGreen rounded-t-lg flex justify-center items-center'>
                        <h1 className='text-white font-bold'>Edit Product</h1>
                    </div>
                    <div className='p-2'>
                        <div className='flex flex-row'>
                            <div className='flex flex-col mt-2 p-3'>
                                <label className='text-sm font-bold text-LightGrey'>Name</label>
                                <input type="text" name="Name" value={name} onChange={handleNameChange} className='bg-LightGrey text-CharcoalGrey h-8 w-full rounded-md p-2 outline-none'  />
                            </div>
                            <div className='flex flex-col mt-2 p-3'>
                                <label className='text-sm font-bold text-LightGrey'>Category</label>
                                <input type="text" name="Category" value={category} onChange={handleCategoryChange} className='bg-LightGrey text-CharcoalGrey h-8 w-full rounded-md p-2 outline-none'  />
                            </div>
                            <div className='flex flex-col mt-2 p-3'>
                                <label className='text-sm font-bold text-LightGrey'>Stock</label>
                                <input type="text" name="Stock" value={stock} onChange={handleStockChange} className='bg-LightGrey text-CharcoalGrey h-8 w-full rounded-md p-2 outline-none' />
                            </div> 
                        </div>
                        <div className='flex flex-row'>
                            <div className='flex flex-col mt-2 p-3'>
                                <label className='text-sm font-bold text-LightGrey'>Size</label>
                                <input type="text" name="Size" value={size} onChange={handleSizeChange} className='bg-LightGrey text-CharcoalGrey h-8 w-full rounded-md p-2 outline-none'  />
                            </div>
                            <div className='flex flex-col mt-2 p-3'>
                                <label className='text-sm font-bold text-LightGrey'>Buy Price</label>
                                <input type="number" name="BuyPrice" value={buyPrice} onChange={handleBuyPriceChange} className='bg-LightGrey text-CharcoalGrey h-8 w-full rounded-md p-2 outline-none'  />
                            </div>
                            <div className='flex flex-col mt-2 p-3'>
                                <label className='text-sm font-bold text-LightGrey'>Price</label>
                                <input type="number" name="Price" value={price} onChange={handlePriceChange} className='bg-LightGrey text-CharcoalGrey h-8 w-full rounded-md p-2 outline-none'  />
                            </div> 
                        </div>
                        <div className='flex flex-row'>
                            <div className='flex flex-col mt-2 p-3'>
                                <label className='text-sm font-bold text-LightGrey'>Image</label>
                                <input type="text" name="Image" value={image} onChange={handleImageChange} className='bg-LightGrey text-CharcoalGrey h-8 w-full rounded-md p-2 outline-none'  />
                            </div>
                            <div className='flex flex-col mt-2 p-3'>
                                <label className='text-sm font-bold text-LightGrey'>Description</label>
                                <input type="text" name="Description" value={description} onChange={handleDescriptionChange} className='bg-LightGrey text-CharcoalGrey h-8 w-full rounded-md p-2 outline-none'  />
                            </div>
                            <div className='flex flex-col mt-2 p-3'>
                                <label className='text-sm font-bold text-LightGrey'>Keywords</label>
                                <input type="text" name="Keywords" value={keywords} onChange={handleKeywordsChange} className='bg-LightGrey text-CharcoalGrey h-8 w-full rounded-md p-2 outline-none'  />
                            </div>               
                        </div>
                        <div className='flex flex-row mt-5 mx-3 justify-between'>
                            <button className='bg-Red h-8 w-36 text-sm font-bold rounded-xl text-LightGrey' onClick={handleEditFalse}>CANCEL</button>
                            <button className='bg-Gold h-8 w-36 text-sm font-bold rounded-xl text-CharcoalGrey' onClick={handleApplyChanges}>APPLY CHANGES</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EditProduct