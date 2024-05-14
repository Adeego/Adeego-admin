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
  const [data, setData] = useState([]);
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

  console.log(data);
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
        </div>
      </header>

      <section className="p-2 flex flex-col gap-6 py-4">
        <div className="px-2">
          <h1 className="font-bold tracking-tight text-2xl">Orders</h1>
          <small className="text-neutral-500">Manage your orders</small>
        </div>
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div></div>
        ) : (
          <OrdersDataTable columns={columns} data={data} />
        )}
      </section>
    </>
  );
};

export default OrdersTable;
