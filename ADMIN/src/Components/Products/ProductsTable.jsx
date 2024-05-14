// 3rd party libraries;
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

// icons;
import { CirclePlus, Search, SlidersHorizontal } from "lucide-react";

// components;
import { DataTable } from "./Datatable";
import { columns } from "./Columns";
import FilterMenu from "./FIlterMenu";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ViewMenu from "./ViewMenu";
import AddProduct from "./AddProduct";

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

const ProductsTable = () => {
  // State variables for data, loading and error
  const [persistentData, setPersistentData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Products availability state;
  const [activeStatus, setActiveStatus] = useState("");

  const toggleActiveStatus = (value) => {
    setActiveStatus(value);

    const filteredData = persistentData.filter(
      (product) => product.Stock === value
    );

    setData(filteredData);
  };

  const resetFilter = () => {
    setData(persistentData);
    setActiveStatus("all");
  };

  const [searchTerm, setSearchTerm] = useState("");

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
          setPersistentData(products);
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

  // Function to delete a product
  
  const deleteProduct = async (productId) => {
    try {
      const db = getFirestore(app);
      const productRef = doc(db, "Products", productId);
      await deleteDoc(productRef);
      console.log(`Product with ID ${productId} deleted successfully`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Search for a product
  const SearchData = (value) => {
    setSearchTerm(value);

    const activeCategoryItems =
      activeStatus === "all" || activeStatus === ""
        ? persistentData
        : persistentData.filter((product) => product.Stock === activeStatus);

    const results = activeCategoryItems.filter((product) => {
      return (
        product.id.toLowerCase().includes(value.toLowerCase()) ||
        product.Name.toLowerCase().includes(value.toLowerCase()) ||
        product.Stock.toLowerCase().includes(value.toLowerCase()) ||
        product.Category.toLowerCase().includes(value.toLowerCase())
      );
    });

    if (value === "") {
      setData(activeCategoryItems);
      return;
    }

    setData(results);
  };

  // Function to handle edit true for a specific product
  const handleEditTrue = (productId) => {
    setEditingProductId(productId);
  };

  // Function to handle edit false
  const handleEditFalse = () => {
    setEditingProductId(null);
  };

  // active status;

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
              value={searchTerm}
              onChange={(e) => {
                SearchData(e.target.value);
              }}
              className="rounded-[0.4rem] pl-9 w-full border-neutral-200/50 focus:border-neutral-400 placeholder:text-neutral-500 max-w-sm md:border-neutral-200"
              placeholder="Search products"
            />
          </div>
        </div>
        <div className="flex gap-2 shrink-0 relative">
          <div className="relative">{/* <ViewMenu /> */}</div>
          <div className="relative">
            <FilterMenu
              activeStatus={activeStatus}
              toggleActiveStatus={toggleActiveStatus}
              resetFilter={resetFilter}
            />
          </div>
          <AddProduct />
        </div>
      </header>

      <section className="p-2 flex flex-col gap-6 py-4">
        <div className="px-2">
          <h1 className="font-bold tracking-tight text-2xl">Products</h1>
          <small className="text-neutral-500">Manage your products</small>
        </div>
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div></div>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </section>
    </>
  );
};

export default ProductsTable;
