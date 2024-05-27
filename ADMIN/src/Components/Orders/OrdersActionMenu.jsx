import { getFirestore, deleteDoc, doc } from "firebase/firestore";
import app from "../../../firebaseConfig";

import { CircleCheck, MoreHorizontal } from "lucide-react";
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
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import EditOrder from "./EditOrder";
import MoreDetailsComp from "./MoreDetails";

const DeleteDialog = ({ order }) => {
  const [confirmText, setConfirmText] = useState("");

  const deleteOrder = async () => {
    if (confirmText === order.id) {
      try {
        const db = getFirestore(app);
        const orderRef = doc(db, "Orders", order.id);
        await deleteDoc(orderRef);
        toast(
          <div className="p-3 bg-white border border-neutral-300 rounded-[0.4rem] flex items-center gap-2 w-full">
            <CircleCheck
              size={16}
              className="stroke-neutral-600 md:text-sm text-neutral-800"
            />
            Order successfully deleted
          </div>
        );
      } catch (error) {
        console.error(error);
        throw error;
      }
    } else {
      alert("Enter the confimation text");
    }
  };

  return (
    <DialogContent className="bg-white w-[90%] !rounded-[0.5rem] gap-5">
      <DialogHeader>
        <DialogTitle className="text-start md:text-xl">
          Delete Order
        </DialogTitle>
      </DialogHeader>
      <p className="text-sm md:text-base">
        Are you sure you want to permanently delete the Order from our servers?
      </p>
      <div className="flex text-xs md:text-sm items-center gap-2 bg-red-100 max-w-fit rounded-[0.3rem] p-1 pl-2 pr-3 text-red-500">
        <p>This action is unreversible</p>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label
          htmlFor="productName"
          className="text-xs text-neutral-600 font-normal md:text-sm select-none pointer-events-none"
        >
          Enter the product name{" "}
          <span className="font-semibold">{order.id}</span> to continue:
        </Label>
        <Input
          type="text"
          id="productName"
          placeholder=""
          value={confirmText}
          onChange={(e) => {
            setConfirmText(e.target.value);
          }}
          className="border-neutral-200 rounded-[0.4rem] text-xs"
        />
      </div>
      <DialogFooter className="flex items-end">
        <div className="flex justify-end w-full gap-2">
          <DialogClose>
            <button
              onClick={deleteOrder}
              className="bg-black text-white rounded-[0.4rem] text-xs py-2 p-3 flex items-center gap-1 md:gap-2 font-medium md:text-base lg:px-6"
            >
              Confirm
            </button>
          </DialogClose>
        </div>
      </DialogFooter>
    </DialogContent>
  );
};

const OrdersActionMenu = ({ order }) => {
  return (
    <>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button variant="ghost" className="p-1">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white border-neutral-200/60 rounded-[0.4rem] flex flex-col gap-1"
          >
            <div className="w-full">
              <EditOrder order={order} />
            </div>
            <div className="w-full">
              <MoreDetailsComp order={order} />
            </div>
            <DropdownMenuItem className="gap-2 items-center text-xs md:text-sm hover:!bg-neutral-200/60 transition !cursor-pointer p-1.5 px-2 rounded-[0.3rem] w-full text-left">
              Invoice
            </DropdownMenuItem>
            <DialogTrigger asChild>
              <DropdownMenuItem
                //   onClick={deleteProduct}
                className="gap-2 items-center text-xs md:text-sm text-red-500 hover:!bg-red-100/60 hover:!text-red-600 active:bg-red-200 rounded-[0.4rem] !cursor-pointer"
              >
                Delete
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <DeleteDialog order={order} />
      </Dialog>
    </>
  );
};

export default OrdersActionMenu;
