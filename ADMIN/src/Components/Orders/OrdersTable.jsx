import { useState, useEffect } from "react";
import {
  getFirestore,
  onSnapshot,
  query,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";
import app from "../../../firebaseConfig";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import EditOrders from "./EditOrder";
import Receipt from "./Receipt";

// icons;
import { CirclePlus, Search, SlidersHorizontal } from "lucide-react";

// components;
import { Input } from "@/components/ui/input";
import OrderFilterMenu from "./OrderFIlterMenu";

const OrdersTable = () => {
  // State variables for data, loading and error
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State variable for currently edited order ID
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [receiptOrderId, setReceiptOrderId] = useState(null);

  // State variables for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [statusOption, setStatusOption] = useState("");

  // Select options for Order Status
  const orderStatusOptions = [
    { status: "All", value: "" },
    { status: "Pending", value: "Pending" },
    { status: "Completed", value: "Completed" },
  ];

  useEffect(() => {
    let unsubscribe;

    const fetchData = async () => {
      try {
        const db = getFirestore(app);
        const q = query(collection(db, "Orders"));

        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const orders = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setData(orders);
          setLoading(false);
        });

        // No need to return unsubscribe here
      } catch (error) {
        setLoading(false);
        console.error("Error:", error);
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

  // Function to delete a order
  const deleteOrder = async (OrderId) => {
    // try {
    //   const db = getFirestore(app);
    //   const orderRef = doc(db, 'Orders', OrderId);
    //   await deleteDoc(orderRef);
    //   console.log(`Product with ID ${OrderId} deleted successfully`);
    // } catch (error) {
    //   console.error(error);
    //   throw error;
    // }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Filter data based on search term
  const filteredData = data.filter((order) => {
    // Customize search logic as needed
    return order.OrderStatus.toLowerCase().includes(statusOption.toLowerCase());
  });

  // Function to handle edit true for a specific order
  const handleEditTrue = (OrderId) => {
    setEditingOrderId(OrderId);
  };

  // Function to handle edit false
  const handleEditFalse = () => {
    setEditingOrderId(null);
  };

  const handleReceiptTrue = (OrderId) => {
    setReceiptOrderId(OrderId);
  };

  const handleReceiptFalse = () => {
    setReceiptOrderId(null);
  };

  // Calculate starting index and display appropriate orders
  const startIndex = (currentPage - 1) * productsPerPage;
  const displayedOrders = filteredData.slice(
    startIndex,
    startIndex + productsPerPage
  );

  return (
    <>
      <header className="flex items-center justify-between px-2 gap-2">
        <div className="w-full">
          <div className="max-w-sm relative">
            <Search
              className="absolute top-2/4 -translate-y-2/4 left-3 stroke-neutral-500"
              size={16}
              strokeWidth={2}
            />
            <Input
              className="rounded-[0.4rem] pl-9 w-full border-neutral-200/50 focus:border-neutral-400 placeholder:text-neutral-500 max-w-sm md:border-neutral-200"
              placeholder="Search orders"
            />
          </div>
        </div>
        <div className="flex gap-2 shrink-0 relative">
          <div className="relative">{/* <ViewMenu /> */}</div>
          <div className="relative">
            {/* <FilterMenu
              activeStatus={activeStatus}
              toggleActiveStatus={toggleActiveStatus}
              resetFilter={resetFilter}
            /> */}
            <OrderFilterMenu />
          </div>
          <button className="w-10 aspect-square md:aspect-auto md:w-auto md:h-10 rounded-[0.4rem] border-neutral-200 grid place-items-center bg-black text-white md:flex gap-2 md:px-4 hover:bg-neutral-800 ">
            <CirclePlus className="h-[15px] w-[15px] stroke-white  select-none pointer-events-none" />
            <span className="hidden md:block text-xs font-medium select-none pointer-events-none">
              Add Product
            </span>
          </button>
        </div>
      </header>

      <section className="p-2 flex flex-col gap-6 py-4">
        <div className="px-2">
          <h1 className="font-bold tracking-tight text-2xl">Orders</h1>
          <small className="text-neutral-500">Manage your orders</small>
        </div>
      </section>
    </>
  );
};

export default OrdersTable;

// <div className='p-3 w-full text-LightGrey'>
//   <div className='bg-transparent w-96 h-12 p-2 rounded-md justify-center' >
//     <select onChange={(e) => setStatusOption(e.target.value)} className='bg-LightGrey h-8 w-4/12 outline-none text-CharcoalGrey p-2 rounded-xl'>
//       {orderStatusOptions.map(option => (
//         <option key={option.status} value={option.value}>{option.status}</option>
//       ))}
//     </select>
//   </div>

//   <table className="table-fixed w-full">
//     <thead className="table-header-group h-8 font-bold text-DarkGrey m-3 ">
//       <tr className='rounded-lg text-left text-sm '>
//         <th className='w-48'>Order Id</th>
//         <th className='w-48'>Customer Id</th>
//         <th className=''>Order Status</th>
//         <th className=''>Status</th>
//         <th className=''>Items</th>
//         <th className=''>Amount</th>
//         <th className=''>Payment Status</th>
//         <th className='w-48'>Action</th>
//       </tr>
//     </thead>
//     <tbody className=''>
//       {displayedOrders.map((order) => (
//         <tr className='border-y-1 border-slate-200 h-10 text-CharcoalGrey p-1 text-left font-medium font-sans text-xs' key={order.id}>
//           <td className=' '>{order.id}</td>
//           <td className=' '>{order.UserId}</td>
//           <td className=' '>{order.OrderStatus}</td>
//           <td className=' '>{order.Status}</td>
//           <td className=' '>{order.TotalItems}</td>
//           <td className=' '>{order.TotalAmount}</td>
//           <td className=' '>{order.PaymentStatus}</td>
//           <td className=' flex, justify-around'>
//             <button className='bg-Gold h-6 p-1 text-xs font-bold rounded-xl text-CharcoalGrey' onClick={() => handleEditTrue(order.id)}>EDIT</button>
//             {
//               editingOrderId === order.id && (
//                 <EditOrders handleEditFalse={handleEditFalse} order={order}/>
//             )}
//             {
//               receiptOrderId === order.id && (
//                 <Receipt handleReceiptFalse={handleReceiptFalse} orderData={order}/>
//             )}
//             <button className=' bg-green-700 h-6 p-1 text-xs font-bold rounded-xl text-LightGrey ml-1' onClick={() => handleReceiptTrue(order.id)}>INVOICE</button>
//             <button className=' bg-Red h-6 p-1 text-xs font-bold rounded-xl text-LightGrey ml-1' onClick={() => deleteOrder(order.id)}>Delete</button>
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>

//   {/* Pagination controls (adjust styling as needed) */}
//   <div className="bg-transparent h-10 flex items-center justify-end mt-5">
//     <div className=' h-8 w-32 bg-LightGrey flex justify-around items-center mr-2 rounded-2xl border-2 border-CharcoalGrey'>
//       <button className='w-8 h-8 text-CharcoalGrey rounded-2xl flex justify-center items-center' onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
//         <GrLinkPrevious />
//       </button>
//       <span className='w-16 h-8 bg-CharcoalGrey flex justify-center items-center text-sm'> {currentPage} of {Math.ceil(data.length / productsPerPage)} </span>
//       <button className='w-8 h-8 text-CharcoalGrey rounded-2xl flex justify-center items-center' onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(data.length / productsPerPage)}>
//         <GrLinkNext />
//       </button>
//     </div>
//   </div>
// </div>
