import React, { useState } from 'react'
import { getFirestore, collection, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import app from '../../../firebaseConfig';

function UserCard({handleCardFalse, user}) {
    // states for input fields
    const [CustomerId, setCustomerId] = useState(user.id);
    const [firstName, setFirstName] = useState((user.FirstName));
    const [lastName, setLastName] = useState(user.LastName);
    const [phone, setPhone] = useState(user.Phone);
    const [addressId, setAddressId] = useState(user.AddressId);
    const [cartId, setCartId] = useState(user.CartId)
    const [passcode, setPasscode] = useState(user.Passcode);
    const [tier, setTier] = useState(user.Tier);
    const [collectionId, setCollectionId] = useState(user.CollectionId)
    const [verified, setVerified] = useState(user.Verified.toString())
    
    //Functions to handle input fields changes
    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    }

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    }

    const handlePasscodeChange = (e) => {
        setPasscode(e.target.value);
    }

    const handleTierChange = (e) => {
        setTier(e.target.value);
    }

    const handleVerifiedChange = (e) => {
        setVerified(e.target.value);
    }

    const tierOptions = [
        {tier: 'New', value: 'New'},
        {tier: 'Bronze', value: 'Bronze'},
        {tier: 'Silver', value: 'Silver'},
        {tier: 'Gold', value: 'Gold'},
        {tier: 'Platinum', value: 'Platinum'},
        {tier: 'Diamond', value: 'Diamond'},
    ]

    const verifiedOptions = [
        {state: 'true', value: 'true'},
        {state: 'false', value: 'false'}
    ]

    // Clear input fields
    const clearInputFields = () => {
        setFirstName('');
        setLastName('');
        setPhone('');
        setPasscode('');
        setTier('');
    }

    // Update the user details
    const handleApplyChanges = async () => {
    //     const fieldsToUpdate = {
    //         FirstName: firstName,
    //         LastName: lastName,
    //         Phone: phone,
    //         Passcode: passcode,
    //         Tier: tier
    //     };

    //     try {
    //       const db = getFirestore(app);  
    //       // Update the user in Firestore
    //       await updateDoc(doc(db, 'User', user.id), fieldsToUpdate);
    
    //       // Handle success (e.g., display a success message or navigate back)
    //       //   console.log('Product updated successfully!');
    
    //       // Clear input fields
    //       clearInputFields();
    //       // Call handleEditFalse if needed
    //       handleCardFalse();
    //     } catch (error) {
    //       // Handle errors (e.g., display an error message to the user)
    //       console.error('Error updating user:', error);
    //     }
    };

    // const deleteDocument = async (collectionName, docId) => {
    //     try {
    //       // Get Firestore instance
    //       const db = getFirestore(app);
      
    //       // Reference to the document
    //       const docRef = doc(db, collectionName, docId);
      
    //       // Delete the document
    //       await deleteDoc(docRef);
      
    //       console.log('Document deleted successfully!');
    //     } catch (error) {
    //       console.error('Error deleting document: ', error);
    //     }
    //   };
    
      // Function to delete documents from User, Address, Collection, and Cart collections
    const deleteUser = async (userDocId, addressDocId, collectionDocId, cartDocId) => {
    //   try {
    //     // Delete documents from respective collections
    //     await deleteDocument('User', userDocId);
    //     await deleteDocument('Address', addressDocId);
    //     await deleteDocument('Collection', collectionDocId);
    //     await deleteDocument('Cart', cartDocId);

    //     handleCardFalse();
    //   } catch (error) {
    //     console.error('Error deleting documents: ', error);
    //   }
    };

  return (
    <div className='w-full'>
        <div className='bg-transparent absolute top-0 bottom-0 left-0 right-0'>
            <div className='p-2 h-full backdrop-blur-xl flex justify-center items-center'>
                <div className='bg-DeepGreen w-5/8 h-96 rounded-lg shadow-lg'>
                    <div className='h-8 w-full bg-DeepGreen rounded-t-lg flex justify-center items-center'>
                        <h1 className='text-white font-bold'>User Detail</h1>
                    </div>
                    <div className='p-2'>
                        <div className='flex flex-row'>
                            <div className='flex flex-col mt-2 p-3'>
                                <label className='text-sm font-bold text-LightGrey'>First Name</label>
                                <input type="text" name="FirstName" value={firstName} onChange={handleFirstNameChange} className='bg-LightGrey text-CharcoalGrey h-8 w-48 rounded-md p-2 outline-none' />
                            </div>
                            <div className='flex flex-col mt-2 p-3'>
                                <label className='text-sm font-bold text-LightGrey'>Last Name</label>
                                <input type="text" name="LastName" value={lastName} onChange={handleLastNameChange} className='bg-LightGrey text-CharcoalGrey h-8 w-48 rounded-md p-2 outline-none' />
                            </div>
                            <div className='flex flex-col mt-2 p-3'>
                                <label className='text-sm font-bold text-LightGrey'>Phone</label>
                                <input type="text" name="Phone" value={phone} onChange={handlePhoneChange} className='bg-LightGrey text-CharcoalGrey h-8 w-48 rounded-md p-2 outline-none' />
                            </div> 
                        </div>
                        <div className='flex flex-row'>
                            <div className='flex flex-col mt-2 p-3'>
                                <label className='text-sm font-bold text-LightGrey'>Verified?</label>
                                <select name="Verified" value={verified} onChange={handleVerifiedChange} className='bg-LightGrey text-CharcoalGrey h-8 w-48 rounded-md p-2 outline-none'>
                                    {verifiedOptions.map((option) => (
                                        <option key={option.state} value={option.value}>{option.state}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex flex-col mt-2 p-3'>
                                <label className='text-sm font-bold text-LightGrey'>Tier</label>
                                <select name="Tier" value={tier} onChange={handleTierChange} className='bg-LightGrey text-CharcoalGrey h-8 w-48 rounded-md p-2 outline-none'>
                                    {tierOptions.map((option) => (
                                        <option key={option.tier} value={option.value}>{option.tier}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex flex-col mt-2 p-3'>
                                <label className='text-sm font-bold text-LightGrey'>Customer ID</label>
                                <h3 className='bg-LightGrey text-CharcoalGrey h-8 w-48 rounded-md p-2 outline-none'>{CustomerId}</h3>
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <div className='flex flex-col mt-2 p-3'>
                                <label className='text-sm font-bold text-LightGrey'>Address ID</label>
                                <h3 className='bg-LightGrey text-CharcoalGrey h-8 w-48 rounded-md p-2 outline-none'>{addressId}</h3>
                            </div>
                            <div className='flex flex-col mt-2 p-3'>
                                <label className='text-sm font-bold text-LightGrey'>Cart ID</label>
                                <h3 className='bg-LightGrey text-CharcoalGrey h-8 w-48 rounded-md p-2 outline-none'>{cartId}</h3>
                            </div>
                            <div className='flex flex-col mt-2 p-3'>
                                <label className='text-sm font-bold text-LightGrey'>Collection ID</label>
                                <h3 className='bg-LightGrey text-CharcoalGrey h-8 w-48 rounded-md p-2 outline-none'>{collectionId}</h3>
                            </div>               
                        </div>
                        <div className='flex flex-row mt-5 mx-3 justify-between'>
                            <button className='bg-Red h-8 w-36 text-sm font-bold rounded-xl text-LightGrey' onClick={handleCardFalse}>CANCEL</button>
                            <button className='bg-Red h-8 w-36 text-sm font-bold rounded-xl text-LightGrey' onClick={() => deleteUser(user.id, user.AddressId, user.CollectionId, user.CartId)}>DELETE</button>
                            <button className='bg-Gold h-8 w-36 text-sm font-bold rounded-xl text-CharcoalGrey' onClick={handleApplyChanges}>APPLY CHANGES</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserCard