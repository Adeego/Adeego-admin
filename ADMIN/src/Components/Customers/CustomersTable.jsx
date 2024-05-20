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
import UserCard from "./UserCard";
import { columns } from "./Columns";

import { Search } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";
import CustomerDataTable from "./CustomerDatatable";
import { Input } from "@/components/ui/input";
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

const customerTable = () => {
  // State variables for data, loading and error
  const [persistentData, setPersistentData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eraseUser, setEraseUser] = useState(false);

  // State variable for user detail ID
  const [cardUserId, setCardUserId] = useState(null);

  // State variables for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setProductsPerPage] = useState(10);

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
          setPersistentData(user);
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

  // search logic
  const [searchTerm, setSearchTerm] = useState("");
  const SearchData = (value) => {
    setSearchTerm(value);
    const results = persistentData.filter((user) => {
      const fullname = user.FirstName + " " + user.LastName;
      return (
        fullname.toLowerCase().includes(value.toLowerCase()) ||
        user.Phone.toLowerCase().includes(value.toLowerCase())
      );
    });

    if (value === "") {
      setData(persistentData);
      return;
    }

    setData(results);
  };
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
              value={searchTerm}
              onChange={(e) => {
                SearchData(e.target.value);
              }}
              className="rounded-[0.4rem] pl-9 w-full border-neutral-200/50 focus:border-neutral-400 placeholder:text-neutral-500 max-w-sm md:border-neutral-200"
              placeholder="Search products"
            />
          </div>
        </div>
        <div className="flex gap-2 shrink-0 relative"></div>
      </header>
      <section className="p-2 flex flex-col gap-6 py-4">
        <div className="px-2">
          <h1 className="font-bold tracking-tight text-2xl">Customers</h1>
          <small className="text-neutral-500">Manage your customers</small>
        </div>
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div></div>
        ) : (
          <CustomerDataTable columns={columns} data={data} />
        )}
      </section>
    </>
  );
};

export default customerTable;
