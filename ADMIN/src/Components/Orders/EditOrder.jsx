import React, { useState, useEffect } from 'react'
import { getFirestore, collection, doc, updateDoc, getDoc } from 'firebase/firestore';
import app from '../../../firebaseConfig';
import Receipt from './Receipt';
import { Link } from 'react-router-dom';

function EditOrders({handleEditFalse, order}) {
    // states for input fields
    const [userId, setUserId] = useState(order.UserId);
    const [orderStatus, setOrderStatus] = useState(order.OrderStatus);
    const [status, setStatus] = useState(order.Status);
    const [totalItems, setTotalItems] = useState(order.TotalItems);
    const [totalAmount, setTotalAmount] = useState(order.TotalAmount);
    const [paymentStatus, setPaymentStatus] = useState(order.PaymentStatus);
    const [items, setItems] = useState(order.Items);
    const [customer, setCustomer] = useState(null)
    const [addressId, setAddressId] = useState(null)
    const [addressData, setAddressData] = useState(null)

    const orderStatusOptions = [
      {status: 'Pending', value: 'Pending'},
      {status: 'Completed', value: 'Completed'},
    ];

    const statusOptions = [
      {status: 'Pending', value: 'Pending'},
      {status: 'Processing', value: 'Processing'},
      {status: 'Out for Delivery', value: 'Out for Delivery'},
      {status: 'Delivered', value: 'Delivered'},
      {status: 'Cancelled', value: 'Cancelled'},
    ];
    
    const paymentOptions = [
        {status: 'Unpaid', value: 'Unpaid'},
        {status: 'Paid', value: 'Paid'},
    ];

    async function getData(collectionName, userId) {
        try {
          const db = getFirestore(app);
          const userRef = doc(db, collectionName, userId);
          const userSnap = await getDoc(userRef);
      
          if (userSnap.exists) {
            return userSnap.data();
          } else {
            // Handle the case where user data is not found
            alert.warn(`${collectionName} data not found for user:`, userId);
            return null;
          }
        } catch (error) {
          alert.error("Error fetching data:", error);
          return null;
        }
    }

    useEffect(() => {
        const fetchData = async () => {
          const data = await getData("User", userId);
          setCustomer(data);
          setAddressId(data.AddressId)
        };
    
        fetchData();
    }, [userId]);

    useEffect(() => {
        const fetchAddress = async () => {
            if (addressId === null) {
                return
            } else {
                const data = await getData("Address", addressId);
                setAddressData(data);
            }
        };
    
        fetchAddress();
    }, [addressId]);
    
    //Functions to handle input fields changes
    const handleOrderStatusChange = (e) => {
        setOrderStatus(e.target.value);
    }

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
    }

    const handlePaymentStatusChange = (e) => {
        setPaymentStatus(e.target.value);
    }

    const handleDeleteItem = async (itemToDelete) => {
        const filteredItems = items.filter((item) => item !== itemToDelete);
        const newTotalAmount = filteredItems.reduce(
          (sum, item) => sum + item.Quantity * item.Price, 0);

        setItems(filteredItems);
        setTotalItems(filteredItems.length);
        setTotalAmount(newTotalAmount);
      };

    // Clear input fields
    const clearInputFields = () => {
        setUserId('');
        setOrderStatus('');
        setStatus('');
        setTotalItems('');
        setTotalAmount('');
        setPaymentStatus('');
        setItems([]);
    }

    // Update the order details
    const handleApplyChanges = async () => {
        const fieldsToUpdate = {
            OrderStatus: orderStatus,
            Status: status,
            Items: items,
            TotalItems: totalItems,
            TotalAmount: totalAmount,
            PaymentStatus: paymentStatus,
        };

        try {
          const db = getFirestore(app);  
          // Update the order in Firestore
          await updateDoc(doc(db, 'Orders', order.id), fieldsToUpdate);
    
          // Handle success (e.g., display a success message or navigate back)
          alert('Product updated successfully!');
    
          // Clear input fields
          clearInputFields();
          // Call handleEditFalse if needed
          handleEditFalse();
        } catch (error) {
          // Handle errors (e.g., display an error message to the user)
          alert.error('Error updating order:', error);
        }
    };

  return (
    <div className='w-full'>
        <div className='bg-transparent absolute top-0 bottom-0 left-0 right-0'>
            <div className='p-2 h-full backdrop-blur-xl flex justify-center items-center'>
                <div className='bg-DeepGreen w-2/4 rounded-lg shadow-lg'>
                    <div className='h-8 w-full bg-DeepGreen rounded-t-lg flex justify-center items-center'>
                        <h1 className='text-white font-bold'>Order</h1>
                    </div>
                    <div className='p-2'>
                        <div className='flex flex-row'>
                            <div className='flex flex-col mt-2 p-3'>
                                <label className='text-sm font-bold text-LightGrey'>User ID</label>
                                <h3 type="text" name="UserId" className='bg-LightGrey text-CharcoalGrey h-8 w-40 rounded-md p-2 outline-none'>{userId}</h3>
                            </div>
                            <div className='flex flex-col mt-2 p-3'>
                                <label className='text-sm font-bold text-LightGrey'>Order Status</label>
                                <select name="OrderStatus" value={orderStatus} onChange={handleOrderStatusChange} className='bg-LightGrey text-CharcoalGrey h-8 w-40 rounded-md p-2 outline-none'>
                                    {orderStatusOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.status}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex flex-col mt-2 p-3'>
                                <label className='text-sm font-bold text-LightGrey'>Status</label>
                                <select name="Status" value={status} onChange={handleStatusChange} className='bg-LightGrey text-CharcoalGrey h-8 w-40 rounded-md p-2 outline-none'>
                                    {statusOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.status}
                                        </option>
                                    ))}
                                </select>
                            </div> 
                        </div>
                        <div className='flex flex-row'>
                            <div className='flex flex-col mt-2 p-3'>
                                <label className='text-sm font-bold text-LightGrey'>Total Items</label>
                                <h3 className='bg-LightGrey text-CharcoalGrey h-8 w-40 rounded-md p-2 outline-none' >{totalItems}</h3>
                            </div>
                            <div className='flex flex-col mt-2 p-3'>
                                <label className='text-sm font-bold text-LightGrey'>Total Amount</label>
                                <h3 className='bg-LightGrey text-CharcoalGrey h-8 w-40 rounded-md p-2 outline-none' >{totalAmount}</h3>
                            </div>
                            <div className='flex flex-col mt-2 p-3'>
                                <label className='text-sm font-bold text-LightGrey'>Payment Status</label>
                                <select name="PaymentStatus" value={paymentStatus} onChange={handlePaymentStatusChange} className='bg-LightGrey text-CharcoalGrey h-8 w-40 rounded-md p-2 outline-none'>
                                    {paymentOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.status}
                                        </option>
                                    ))}
                                </select>
                            </div> 
                        </div>
                        <div className='flex flex-row'>
                            <div className='flex flex-col mt-2 p-3'>
                                <label className='text-sm font-bold text-LightGrey'>List of Items</label>
                                <div >
                                    {items.map((item, index) => (
                                       <div key={index} className='flex flex-row justify-between bg-LightGrey m-2 rounded-md items-center p-1'>
                                          <p className='text-sm font-bold text-DarkGrey w-36'>{item.Name}</p>
                                          <p className='text-sm font-bold text-DarkGrey'>{item.Quantity} x {item.Price}</p>
                                          <button className='bg-Red text-DarkGrey text-sm font-bold rounded-md m-2 w-14' onClick={() => handleDeleteItem(item)}>Delete</button>
                                       </div>
                                    ))}   
                                </div>
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

export default EditOrders