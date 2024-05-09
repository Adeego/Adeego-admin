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

import ringSound from "../../Assets/ring.wav";

const OrdersTable = () => {
  // PLAY TONE FOR NEW ORDER
  const [audioInstance, setAudioInstance] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const newOrder = () => setIsPlayingAudio(true);
  const processOrder = () => setIsPlayingAudio(false);

  const PlayAudio = () => {
    const sound = new Audio(ringSound);
    sound.play();
    sound.addEventListener("ended", () => {
      sound.currentTime = 0;
      sound.play();
    });
    setAudioInstance(sound);
  };
  const StopAudio = () => {
    if (audioInstance) {
      audioInstance.pause();
      setAudioInstance(null);
    }
  };
  useEffect(() => {
    if (isPlayingAudio) {
      PlayAudio();
    } else {
      StopAudio();
    }

    return () => {
      if (audioInstance) {
        audioInstance.pause();
        setAudioInstance(null);
      }
    };
  }, [isPlayingAudio]);

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
      <div className="flex items-center gap-3">
        <button
          className="bg-green-700 px-4 py-2 rounded-xl hover:bg-green-900 text-white font-medium"
          onClick={newOrder}
        >
          Play
        </button>
        <button
          className="bg-red-700 px-4 py-2 rounded-xl hover:bg-red-900 text-white font-medium"
          onClick={processOrder}
        >
          stop
        </button>
      </div>
      <div className="p-3 w-full text-LightGrey">
        <div className="bg-transparent w-96 h-12 p-2 rounded-md justify-center">
          <select
            onChange={(e) => setStatusOption(e.target.value)}
            className="bg-LightGrey h-8 w-4/12 outline-none text-CharcoalGrey p-2 rounded-xl"
          >
            {orderStatusOptions.map((option) => (
              <option key={option.status} value={option.value}>
                {option.status}
              </option>
            ))}
          </select>
        </div>

        <table className="table-fixed w-full">
          <thead className="table-header-group h-8 font-bold text-DarkGrey m-3 ">
            <tr className="rounded-lg text-left text-sm ">
              <th className="w-48">Order Id</th>
              <th className="w-48">Customer Id</th>
              <th className="">Order Status</th>
              <th className="">Status</th>
              <th className="">Items</th>
              <th className="">Amount</th>
              <th className="">Payment Status</th>
              <th className="w-48">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {displayedOrders.map((order) => (
              <tr
                className="border-y-1 border-slate-200 h-10 text-CharcoalGrey p-1 text-left font-medium font-sans text-xs"
                key={order.id}
              >
                <td className=" ">{order.id}</td>
                <td className=" ">{order.UserId}</td>
                <td className=" ">{order.OrderStatus}</td>
                <td className=" ">{order.Status}</td>
                <td className=" ">{order.TotalItems}</td>
                <td className=" ">{order.TotalAmount}</td>
                <td className=" ">{order.PaymentStatus}</td>
                <td className=" flex, justify-around">
                  <button
                    className="bg-Gold h-6 p-1 text-xs font-bold rounded-xl text-CharcoalGrey"
                    onClick={() => handleEditTrue(order.id)}
                  >
                    EDIT
                  </button>
                  {editingOrderId === order.id && (
                    <EditOrders
                      handleEditFalse={handleEditFalse}
                      order={order}
                    />
                  )}
                  {receiptOrderId === order.id && (
                    <Receipt
                      handleReceiptFalse={handleReceiptFalse}
                      orderData={order}
                    />
                  )}
                  <button
                    className=" bg-green-700 h-6 p-1 text-xs font-bold rounded-xl text-LightGrey ml-1"
                    onClick={() => handleReceiptTrue(order.id)}
                  >
                    INVOICE
                  </button>
                  <button
                    className=" bg-Red h-6 p-1 text-xs font-bold rounded-xl text-LightGrey ml-1"
                    onClick={() => deleteOrder(order.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination controls (adjust styling as needed) */}
        <div className="bg-transparent h-10 flex items-center justify-end mt-5">
          <div className=" h-8 w-32 bg-LightGrey flex justify-around items-center mr-2 rounded-2xl border-2 border-CharcoalGrey">
            <button
              className="w-8 h-8 text-CharcoalGrey rounded-2xl flex justify-center items-center"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <GrLinkPrevious />
            </button>
            <span className="w-16 h-8 bg-CharcoalGrey flex justify-center items-center text-sm">
              {" "}
              {currentPage} of {Math.ceil(data.length / productsPerPage)}{" "}
            </span>
            <button
              className="w-8 h-8 text-CharcoalGrey rounded-2xl flex justify-center items-center"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(data.length / productsPerPage)
              }
            >
              <GrLinkNext />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersTable;
