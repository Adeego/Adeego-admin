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
import AgentsDataTable from "./AgentDatatable";
import { columns } from "./Columns";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import RegisterAgent from "./RegisterAgent";

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

const AgentsTable = () => {
  // State variables for data, loading and error
  const [persistentData, setPersistentData] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unsubscribe;

    const fetchData = async () => {
      try {
        const db = getFirestore(app);
        const q = query(collection(db, "Agents"));

        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const agents = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setData(agents);
          setPersistentData(agents);
          setLoading(false);
        });
      } catch (error) {
        setLoading(false);
        console.error("Error:", error);
      }
    };

    fetchData();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const SearchData = (value) => {
    setSearchTerm(value);

    const results = persistentData.filter((agent) => {
      return (
        agent.FullName.toLowerCase().includes(value.toLowerCase()) ||
        agent.Address.toLowerCase().includes(value.toLowerCase()) ||
        agent.Code.toLowerCase().includes(value.toLowerCase()) ||
        agent.Wallet.toString().toLowerCase().includes(value.toLowerCase())
      );
    });

    if (value === "") {
      setData(persistentData);
      return;
    }

    setData(results);
  };

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
              placeholder="Search agents"
            />
          </div>
        </div>
        <div className="flex gap-2 shrink-0 relative">
          <RegisterAgent />
        </div>
      </header>

      <section className="p-2 flex flex-col gap-6 py-4">
        <div className="px-2">
          <h1 className="font-bold tracking-tight text-2xl">Agents</h1>
          <small className="text-neutral-500">Manage your agents</small>
        </div>
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <div></div>
        ) : (
          <AgentsDataTable columns={columns} data={data} />
        )}
      </section>
    </>
  );
};

export default AgentsTable;
