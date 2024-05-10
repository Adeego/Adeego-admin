"use client";

import { useState } from "react";
import ActionsMenu from "./ActionsMenu";
import { Skeleton } from "@/components/ui/skeleton";
import { Image } from "lucide-react";

export const columns = [
  {
    accessorKey: "Image",
    header: () => <div className="text-left">Image</div>,
    cell: ({ row }) => {
      const [imageLoading, setImageLoading] = useState(true);
      const image = row.original.Image;
      return (
        <div className="h-10 aspect-square rounded-[0.3rem] overflow-hidden bg-neutral-200">
          <div
            className={`w-full h-full ${
              !imageLoading && "hidden"
            } grid place-items-center`}
          >
            <Image className="stroke-neutral-600" size={16} />
          </div>

          <img
            src={image}
            onLoad={(e) => {
              setImageLoading(false);
              console.log("image");
            }}
            className={`${imageLoading && "hidden"}`}
            alt="image"
          />
        </div>
      );
    },
  },
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
    header: () => <div className="text-left">Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("Price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "KES",
      }).format(amount);

      return <div className="text-right font-medium text-xs">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row, props }) => {
      const product = row.original;
      const deleteProduct = () => {
        console.log("delete");
      };
      return <ActionsMenu deleteProduct={deleteProduct} product={product} />;
    },
  },
];
