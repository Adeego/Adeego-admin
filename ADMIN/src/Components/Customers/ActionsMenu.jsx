// firebase stuff;
import { getFirestore, deleteDoc, doc } from "firebase/firestore";
import app from "../../../firebaseConfig";

import { Button } from "@/components/ui/button";
import {
  Check,
  CircleAlert,
  CircleCheck,
  MoreHorizontal,
  Pencil,
  Trash,
} from "lucide-react";
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
import EditCustomer from "./EditCustomer";
import MoreDetailsComp from "./Moredetails";

const DeleteDialog = ({ customer }) => {
  const [confirmText, setConfirmText] = useState("");

  const userId = customer.id;

  const deletecustomer = async () => {
    if (confirmText == userId) {
      try {
        const db = getFirestore(app);

        // Delete user document
        await deleteDoc(doc(db, "User", userId));

        // Delete address document (assuming userId is the reference)
        await db.collection("Address").doc(userId).delete();

        // Delete collections document (assuming userId is the reference)
        await db.collection("Collection").doc(userId).delete();

        // Delete cart document (assuming userId is the reference)
        await db.collection("Cart").doc(userId).delete();
        toast(
          <div className="p-3 bg-white border border-neutral-300 rounded-[0.4rem] flex items-center gap-2 w-full">
            <CircleCheck
              size={16}
              className="stroke-neutral-600 md:text-sm text-neutral-800"
            />
            customer successfully deleted
          </div>
        );
        setConfirmText(" ");
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
          Delete customer
        </DialogTitle>
      </DialogHeader>
      <p className="text-sm md:text-base">
        Are you sure you want to permanently delete the customer from our
        servers?
      </p>
      <div className="flex text-xs md:text-sm items-center gap-2 bg-red-100 max-w-fit rounded-[0.3rem] p-1 pl-2 pr-3 text-red-500">
        <p>This action is unreversible</p>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label
          htmlFor="customerName"
          className="text-xs text-neutral-600 font-normal md:text-sm select-none pointer-events-none"
        >
          Enter the customer Id{" "}
          <span className="font-semibold">{customer.id}</span> to continue:
        </Label>
        <Input
          type="text"
          id="customerName"
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
              onClick={deletecustomer}
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

const ActionsMenu = ({ customer }) => {
  return (
    <>
      <Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 !cursor-pointer">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4 pointer-events-none" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-white border-neutral-200/60 rounded-[0.4rem] flex flex-col gap-1"
          >
            <div className="gap-2 items-center text-xs md:text-sm hover:!bg-neutral-200/60 transition !cursor-pointer  rounded-[0.3rem] w-full text-left p-2">
              <MoreDetailsComp customer={customer} />
            </div>
            <div className="gap-2 items-center text-xs md:text-sm hover:!bg-neutral-200/60 transition !cursor-pointer  rounded-[0.3rem] w-full text-left">
              <EditCustomer customer={customer} />
            </div>

            <DialogTrigger asChild>
              <DropdownMenuItem className="gap-2 items-center text-xs md:text-sm text-red-500 hover:!text-red-500 !cursor-pointer hover:!bg-red-100/60 active:bg-red-200 rounded-[0.4rem]">
                Delete customer
              </DropdownMenuItem>
            </DialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>

        <DeleteDialog customer={customer} />
      </Dialog>
    </>
  );
};

export default ActionsMenu;
