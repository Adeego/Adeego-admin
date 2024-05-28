import { useState, useEffect } from "react";
import {
  getFirestore,
  onSnapshot,
  query,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";
import app, { RequestPermission } from "../../../firebaseConfig";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import OrderFilterMenu from "./OrderFIlterMenu";
import { OrdersDataTable } from "./OrdersDatatable";
import { columns } from "./Columns";
import { Skeleton } from "@/components/ui/skeleton";
import CreateOrder from "./CreateOrder";

const LoadingSkeleton = () => {
  return (
    <div>
      <div className="w-full flex flex-col rounded-[0.4rem] overflow-hidden gap-[2px]">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="w-full">
            <Skeleton
              className={`w-full h-16 ${
                i % 2 == 0 ? "bg-neutral-200" : "bg-neutral-200/60"
              } `}
              key={i}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const OrdersTable = () => {
  const [data, setData] = useState([]);
  const [persistentData, setPersistentData] = useState([]);

  // State variables for data, loading and error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // filter orders availability state;
  const [activeStatus, setActiveStatus] = useState("");

  const toggleActiveStatus = (value) => {
    setActiveStatus(value);
    const filteredData = persistentData.filter(
      (order) => order.OrderStatus === value
    );

    setData(filteredData);
  };

  const resetFilter = () => {
    setData(persistentData);
    setActiveStatus("all");
  };

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
          setPersistentData(orders);
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
          <div className="relative flex gap-2">
            <OrderFilterMenu
              activeStatus={activeStatus}
              toggleActiveStatus={toggleActiveStatus}
              resetFilter={resetFilter}
            />
            <CreateOrder />
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
          // <OrdersData  />
        )}
      </section>

      <RequestPermission />
    </>
  );
};

export default OrdersTable;
