import { useState, useEffect } from 'react';
import { getFirestore, onSnapshot, query, collection, deleteDoc, doc } from "firebase/firestore";
import app from '../../../firebaseConfig';
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import UserCard from './UserCard';

const customerTable = () => {
  // State variables for data, loading and error
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eraseUser, setEraseUser] = useState(false);

  // State variable for user detail ID
  const [cardUserId, setCardUserId] = useState(null);


  // State variables for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setProductsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let unsubscribe;
  
    const fetchData = async () => {
      try {
        const db = getFirestore(app);
        const q = query(collection(db, "User")); // change user to agents.
  
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const user = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setData(user);
          setLoading(false);
        });
  
        // No need to return unsubscribe here
      } catch (error) {
        setLoading(false);
        console.error('Error:', error);
        // Optionally add cleanup code for the error case
        // return cleanupFunctionForError;
      }
    };
  
    fetchData();
  
    // Cleanup function to detach the listener on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  // // Function to delete a user
  // const deleteUser = async (userId) => {
  //   try {
  //     const db = getFirestore(app);
  //     // const userRef = doc(db, 'User', userId);
  //     // await deleteDoc(userRef);
  //     // console.log(`User with ID ${userId} deleted successfully`);

  //     // Delete user document
  //     await deleteDoc(doc(db, 'User', userId));
  
  //     // // Delete address document (assuming userId is the reference)
  //     // await db.collection('Address').doc(userId).delete();
  
  //     // // Delete collections document (assuming userId is the reference)
  //     // await db.collection('Collection').doc(userId).delete();
  
  //     // // Delete cart document (assuming userId is the reference)
  //     // await db.collection('Cart').doc(userId).delete();
      
  //     console.log('User and related documents deleted successfully!');
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Filter data based on search term
  const filteredData = data.filter((user) => {
    // Customize search logic as needed
    return (
      user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.FirstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.LastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.Phone.toLowerCase().includes(searchTerm.toLowerCase())
      // user.Role.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Calculate starting index and display appropriate user
  const startIndex = (currentPage - 1) * usersPerPage;
  const displayedUsers = filteredData.slice(startIndex, startIndex + usersPerPage);

  // Function to handle edit true for a specific user
  const handleCardTrue = (userId) => {
    setCardUserId(userId);
  }

  // Function to handle edit false
  const handleCardFalse = () => {
    setCardUserId(null);
  }

  return (
    <div className='p-3 w-full text-LightGrey'>
      <div className='bg-transparent w-full flex flex-row h-12 p-2 rounded-md justify-between' >
        <input type="text" placeholder='Search for user' value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} className=' bg-LightGrey h-8 w-56 outline-none text-CharcoalGrey p-2 rounded-xl' />
      </div>
  
      <table className="table-fixed w-full">
        <thead className="table-header-group h-8 font-bold text-DarkGrey m-3 ">
          <tr className='rounded-lg text-left text-sm '>
            <th className=''>Name</th>
            <th className=''>Phone</th>
            <th className=''>Role</th>
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody className=''>
          {displayedUsers.map((user) => (
            <tr className='border-y-1 border-slate-200 h-10 text-CharcoalGrey p-1 text-left font-medium font-sans text-xs' key={user.id}>
              <td className=' '>{user.FirstName} {user.LastName}</td>
              <td className=' '>{user.Phone}</td>
              <td className=' '>{user.Tier}</td>
              <td className=' flex, justify-around'>
                <button className='bg-Gold h-6 p-1 text-xs font-bold rounded-xl text-CharcoalGrey' onClick={() => handleCardTrue(user.id)}>DETAIL</button>
                  {
                    cardUserId === user.id && (
                      <UserCard handleCardFalse={handleCardFalse} user={user}/>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls (adjust styling as needed) */}
      <div className="bg-transparent h-10 flex items-center justify-end mt-5">
        <div className=' h-8 w-32 bg-LightGrey flex justify-around items-center mr-2 rounded-2xl border-2 border-CharcoalGrey'>
          <button className='w-8 h-8 text-CharcoalGrey rounded-2xl flex justify-center items-center' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            <GrLinkPrevious />
          </button>
          <span className='w-16 h-8 bg-CharcoalGrey flex justify-center items-center text-sm'> {currentPage} of {Math.ceil(data.length / usersPerPage)} </span>
          <button className='w-8 h-8 text-CharcoalGrey rounded-2xl flex justify-center items-center' onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(data.length / usersPerPage)}>
            <GrLinkNext />
          </button>
        </div>
      </div>
    </div> 
  );
};

export default customerTable;
