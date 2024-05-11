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

const OrdersActionMenu = () => {
  return (
    <>
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
              <DropdownMenuItem className="gap-2 items-center hover:!bg-neutral-200/60 transition rounded-lg">
                Edit
              </DropdownMenuItem>
              <DialogTrigger asChild>
                <DropdownMenuItem
                //   onClick={deleteProduct}
                  className="gap-2 items-center text-red-500 hover:!bg-red-100/60 active:bg-red-200 rounded-[0.4rem]"
                >
                  Delete
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
        </Dialog>
      </>
    </>
  );
};

export default OrdersActionMenu;
