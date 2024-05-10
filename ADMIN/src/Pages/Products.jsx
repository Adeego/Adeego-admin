import React, { useState, useEffect } from "react";
import ProductsTable from "../Components/Products/ProductsTable";
import staffStore from "../Store/UserStore";
import { useNavigate } from "react-router-dom";

// components;
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Products = () => {
  const staff = staffStore((state) => state.staff);
  const navigate = useNavigate();

  useEffect(() => {
    if (staff == null) {
      navigate("/login");
    }
  }, [staff]);

  const handleJsonredirect = () => {
    navigate("/json");
  };

  return (
    <div className="w-full bg-LightGrey items-center mt-16 pt-2">
      <ProductsTable />
    </div>
  );
};

export default Products;
