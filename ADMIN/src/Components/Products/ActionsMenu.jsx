import { Button } from "@/components/ui/button";
import { Check, CircleAlert, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

const DeleteDialog = ({ product }) => {
  return (
    <DialogContent className="bg-white w-[90%] rounded-[0.5rem] gap-5">
      <DialogHeader>
        <DialogTitle className="text-start">Delete Product</DialogTitle>
      </DialogHeader>
      <p className="text-sm">
        Are you sure you want to permanently delete the product from our
        servers?
      </p>
      {/* <div className="flex text-xs items-center gap-2 bg-red-100 max-w-fit rounded-[0.3rem] p-1 pl-2 pr-3 text-red-500">
        <span className="text-black">Warning :</span>
        <p>This action is unreversible</p>
      </div> */}
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label
          htmlFor="productName"
          className="text-xs text-neutral-600 font-normal"
        >
          Enter the product name{" "}
          <span className="font-semibold">{product.Name}</span> to continue:
        </Label>
        <Input
          type="text"
          id="productName"
          placeholder=""
          className="border-neutral-200 rounded-[0.4rem] text-xs"
        />
      </div>
      <DialogFooter className="flex items-end">
        <div className="flex justify-end w-full gap-2">
          <button className="bg-red-600 text-white rounded-[0.4rem] !text-xs py-2 p-3 flex items-center gap-1 font-medium">
            <Check size={12} strokeWidth={3} />
            Confirm
          </button>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

const ActionsMenu = ({ deleteProduct, product }) => {
  return (
    <>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white border-neutral-200/60 rounded-[0.4rem]"
          >
            <DropdownMenuItem className="gap-2 items-center">
              Edit
            </DropdownMenuItem>
            <DialogTrigger asChild>
              <DropdownMenuItem
                onClick={deleteProduct}
                className="gap-2 items-center text-red-500"
              >
                Delete
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <DeleteDialog product={product} />
      </Dialog>
    </>
  );
};

export default ActionsMenu;
