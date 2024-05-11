"use client";

import { Check, Loader, X } from "lucide-react";
import OrdersActionMenu from "./OrdersActionMenu";

export const columns = [
  {
    accessorKey: "Id",
    header: () => <div className="text-left">Order Id</div>,
    cell: ({ row }) => {
      const orderId = row.original.id;
      return <div>{orderId}</div>;
    },
  },
  {
    accessorKey: `Customer Id`,
    header: () => <div className="text-left">Customer Id</div>,
    cell: ({ row }) => {
      const customerId = row.original.id;
      return <div>{customerId}</div>;
    },
  },
  {
    accessorKey: "TotalItems",
    header: () => <div className="text-left">Items</div>,
  },
  {
    accessorKey: "Status",
    header: () => <div className="text-left">Order Status</div>,
    cell: ({ row }) => {
      const status = row.getValue("Status");
      const bg =
        status === "Delivered"
          ? "text-green-600"
          : status === "Pending"
          ? "text-blue-600"
          : "text-red-600";

      const svg =
        status === "Delivered" ? (
          <Check size={12} strokeWidth="3" />
        ) : status === "Pending" ? (
          <Loader size={12} strokeWidth="3" />
        ) : (
          <X size={12} strokeWidth="3" />
        );
      return (
        <div className="flex items-center gap-2">
          <div className={`${bg} rounded-full  grid place-items-center`}>
            {svg}
          </div>
          <p className={`font-medium`}>{status}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "TotalAmount",
    header: () => <div className="text-left">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("TotalAmount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "KES",
      }).format(amount);

      return <div className="text-left font-medium text-xs">{formatted}</div>;
    },
  },
  {
    accessorKey: "PaymentStatus",
    header: () => <div className="text-left">Payment Status</div>,
    cell: ({ row }) => {
      const status = row.original.PaymentStatus;
      const textColor = status === "Paid" ? "text-green-600" : "text-red-600";

      const svg =
        status === "Paid" ? (
          <Check size={12} strokeWidth="3" />
        ) : (
          <X size={12} strokeWidth="3" />
        );

      return (
        <div className="flex items-center gap-2">
          <div className={`${textColor} rounded-full  grid place-items-center`}>
            {svg}
          </div>
          <p className={`font-medium`}>{status}</p>
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
