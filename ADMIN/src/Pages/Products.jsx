import React, { useState, useEffect } from "react";
import ProductsTable from "../Components/Products/ProductsTable";
import AddProduct from "../Components/Products/AddProduct";
import staffStore from "../Store/UserStore";
import { useNavigate } from "react-router-dom";

// components;
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpDown, ListFilter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Products = () => {
  const [addProduct, setAddProduct] = useState(false);
  const staff = staffStore((state) => state.staff);
  const navigate = useNavigate();

  useEffect(() => {
    if (staff == null) {
      navigate("/login");
    }
  }, [staff]);

  const handleFalse = () => {
    setAddProduct(false);
  };

  const handleTrue = () => {
    setAddProduct(true);
  };

  const handleJsonredirect = () => {
    navigate("/json");
  };

  return (
    <div className="w-full bg-LightGrey items-center mt-16 pt-2">
      {/* <div className="flex justify-end items-center h-16 p-3 w-full">
        <button
          className="bg-DeepGreen text-LightGrey h-8 w-36 text-sm font-bold rounded-xl"
          onClick={handleTrue}
        >
          ADD PRODUCT
        </button>
      </div> */}

      <header className="flex items-center justify-between px-2 gap-4">
        <div className="w-full">
          <Input className='rounded-[0.4rem] w-full border-neutral-200 focus:border-neutral-400 placeholder:text-neutral-500' placeholder='Search products' />
        </div>
        <div className="flex gap-2 shrink-0">
          <Button
            variant="outline"
            size="icon"
            className="rounded-[0.5rem] border-neutral-200 text-neutral-500"
          >
            <ListFilter size={15} strokeWidth={2} />
          </Button>
          <Button
            size="icon"
            className="rounded-[0.5rem] border-neutral-200 grid place-items-center bg-black text-white"
          >
            <Plus size={15} strokeWidth={2} />
          </Button>
        </div>
      </header>

      {addProduct && <AddProduct handleFalse={handleFalse} />}
    </div>
  );
};

export default Products;
