"use client";

export const columns = [
  {
    accessorKey: "Name",
    header: () => <div className="text-left">Name</div>,
  },
  {
    accessorKey: "Category",
    header: () => <div className="text-left">Category</div>,
  },
  {
    accessorKey: "Size",
    header: () => <div className="text-left">Quantity</div>,
  },
  {
    accessorKey: "Stock",
    header: () => <div className="text-left">Availability</div>,
  },
  {
    accessorKey: "BuyPrice",
    header: () => <div className="text-right">Buying Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("BuyPrice"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "KSH",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "Price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("Price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "Kes",
      }).format(amount);

      return <div className="text-right font-medium ">{formatted}</div>;
    },
  },
  //   {
  //     accessorKey: "total sales",
  //     header: "Total Sales",
  //   },
];
