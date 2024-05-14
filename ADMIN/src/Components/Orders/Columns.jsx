"use client";

import { Check, Loader, X } from "lucide-react";
import OrdersActionMenu from "./OrdersActionMenu";

export const columns = [
  {
    accessorKey: "Id",
    header: () => <div className="text-left text-xs md:text-sm">Order Id</div>,
    cell: ({ row }) => {
      const orderId = row.original.id;
      return <p className="text-xs md:text-sm">{orderId}</p>;
    },
  },
  {
    accessorKey: `Customer Id`,
    header: () => (
      <div className="text-left text-xs md:text-sm">Customer Id</div>
    ),
    cell: ({ row }) => {
      const customerId = row.original.UserId;
      return <div className="text-xs md:text-sm">{customerId}</div>;
    },
  },
  {
    accessorKey: "TotalItems",
    header: () => <div className="text-left text-xs md:text-sm">Items</div>,
  },
  {
    accessorKey: "OrderStatus",
    header: () => (
      <div className="text-left text-xs md:text-sm ">Order Status</div>
    ),
    cell: ({ row }) => {
      const status = row.original.OrderStatus;
      const bg =
        status === "Completed"
          ? "bg-green-600"
          : status === "Pending"
          ? "bg-blue-600"
          : "bg-red-600";

      return (
        <div className="flex items-center gap-2">
          <div
            className={`${bg} rounded-full  grid place-items-center h-[6px] aspect-square`}
          ></div>
          <p className={`font-medium text-xs md:text-sm`}>{status}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "Status",
    header: () => <div className="text-left text-xs md:text-sm ">Status</div>,
    cell: ({ row }) => {
      const status = row.original.Status;
      const bg =
        status === "Completed"
          ? "bg-green-600"
          : status === "Pending"
          ? "bg-blue-600"
          : "bg-red-600";

      return (
        <div className="flex items-center gap-2">
          {/* <div
            className={`${bg} rounded-full  grid place-items-center h-[6px] aspect-square`}
          ></div> */}
          <p className={`font-medium text-xs md:text-sm`}>{status}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "TotalAmount",
    header: () => <div className="text-left text-xs md:text-sm">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("TotalAmount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "KES",
      }).format(amount);

      return (
        <div className="text-left font-medium text-xs md:text-sm">
          {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "PaymentStatus",
    header: () => (
      <div className="text-left text-xs md:text-sm">Payment Status</div>
    ),
    cell: ({ row }) => {
      const status = row.original.PaymentStatus;
      const textColor = status === "Paid" ? "bg-green-600" : "bg-red-600";

      const svg =
        status === "Paid" ? (
          <Check size={12} strokeWidth="3" />
        ) : (
          <X size={12} strokeWidth="3" />
        );

      return (
        <div className="flex items-center gap-2">
          <div
            className={`${textColor} rounded-full  grid place-items-center h-[6px] aspect-square`}
          >
            {/* {svg} */}
          </div>
          <p className={`font-medium text-xs md:text-sm`}>{status}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row, props }) => {
      const order = row.original;
      const deleteOrder = () => {
        console.log("delete");
      };
      return <OrdersActionMenu deleteProduct={deleteOrder} order={order} />;
    },
  },
];
