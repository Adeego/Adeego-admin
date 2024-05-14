import React, { useEffect, useState } from "react";
import NewOrder from "../Components/Orders/NewOrder";
import OrdersTable from "../Components/Orders/OrdersTable";
import { useNavigate } from "react-router-dom";
import staffStore from "../Store/UserStore";


// sound;
import ringSound from "../Assets/ring.wav";

const Orders = () => {
  const staff = staffStore((state) => state.staff);
  const navigate = useNavigate();

  useEffect(() => {
    if (staff == null) {
      navigate("/login");
    }
  }, [])

  return (
    <div className="w-full bg-LightGrey items-center mt-16 pt-2">
      <OrdersTable />
    </div>
  );
};

export default Orders;
