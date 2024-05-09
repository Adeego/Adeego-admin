import { useState, useEffect } from 'react';
import { getFirestore, onSnapshot, query, collection, deleteDoc, doc } from "firebase/firestore";
import app from '../../../firebaseConfig';
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import EditProduct from './EditProduct';

const ProductsTable = () => {
  // State variables for data, loading and error
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State variable for currently edited product ID
  const [editingProductId, setEditingProductId] = useState(null);

  // State variables for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let unsubscribe;
  
    const fetchData = async () => {
      try {
        const db = getFirestore(app);
        const q = query(collection(db, "Products"));
  
        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const products = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setData(products);
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

  // Function to delete a product
  const deleteProduct = async (productId) => {
    try {
      const db = getFirestore(app);
      const productRef = doc(db, 'Products', productId);
      await deleteDoc(productRef);
      console.log(`Product with ID ${productId} deleted successfully`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Filter data based on search term
  const filteredData = data.filter((product) => {
    // Customize search logic as needed
    return (
      product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.Stock.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.Category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Function to handle edit true for a specific product
  const handleEditTrue = (productId) => {
    setEditingProductId(productId);
  }

  // Function to handle edit false
  const handleEditFalse = () => {
    setEditingProductId(null);
  }

  // Calculate starting index and display appropriate products
  const startIndex = (currentPage - 1) * productsPerPage;
  const displayedProducts = filteredData.slice(startIndex, startIndex + productsPerPage);


  return (
    <div className='p-3 w-full text-LightGrey'>
      <div className='bg-transparent w-full flex flex-row h-12 p-2 rounded-md justify-between' >
        <input type="text" placeholder='Search for products' value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} className=' bg-LightGrey h-8 w-56 outline-none text-CharcoalGrey p-2 rounded-xl' />
      </div>
  
      <table className="table-fixed w-full">
        <thead className="table-header-group h-8 font-bold text-DarkGrey m-3 ">
          <tr className='rounded-lg text-left text-sm '>
            <th className=''>Name</th>
            <th className=''>Category</th>
            <th className=''>Size</th>
            <th className=''>Stock</th>
            <th className=''>Buy Price</th>
            <th className=''>Sell Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className=''>
          {displayedProducts.map((product) => (
            <tr className='border-y-1 border-slate-200 h-10 text-CharcoalGrey p-1 text-left font-medium font-sans text-xs' key={product.id}>
              <td className=' '>{product.Brand} {product.Name}</td>
              <td className=' '>{product.Category}</td>
              <td className=' '>{product.Size}</td>
              <td className=' '>{product.Stock}</td>
              <td className=' '>{product.BuyPrice}</td>
              <td className=' '>{product.Price}</td>
              <td className=' flex, justify-around'>
                <button className='bg-Gold h-6 p-1 text-xs font-bold rounded-xl text-CharcoalGrey' onClick={() => handleEditTrue(product.id)}>EDIT</button>
                {
                  editingProductId === product.id && (
                    <EditProduct handleEditFalse={handleEditFalse} product={product}/>
                )}
                <button className='bg-Red h-6 p-1 text-xs font-bold rounded-xl text-LightGrey ml-1' onClick={() => deleteProduct(product.id)}>DELETE</button>
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
          <span className='w-16 h-8 bg-CharcoalGrey flex justify-center items-center text-sm'> {currentPage} of {Math.ceil(data.length / productsPerPage)} </span>
          <button className='w-8 h-8 text-CharcoalGrey rounded-2xl flex justify-center items-center' onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(data.length / productsPerPage)}>
            <GrLinkNext />
          </button>
        </div>
      </div>
    </div> 
  );
};

export default ProductsTable;
