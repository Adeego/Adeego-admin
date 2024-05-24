import React from "react";
import Search from "./ProductSearch";
import OrderList from "./OrderList";

function CreateOrderComp() {
  return (
    <div className="grid grid-cols-2 h-full w-full border border-neutral-200 divide-x divide-neutral-200 rounded-[0.2rem]">
      <div className="w-full flex justify-center p-2">
        <Search />
      </div>
      <div className="w-full">
        <OrderList />
      </div>
    </div>
  );
}

export default CreateOrderComp;
