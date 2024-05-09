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

  return (
    <div className="bg-LightGrey items-center">
      <div className="h-12 justify-center mt-3"></div>
      <div className=" bg-white rounded-xl  w-full shadow-lg">
        <OrdersTable />
      </div>
    </div>
  );
};

export default Orders;
