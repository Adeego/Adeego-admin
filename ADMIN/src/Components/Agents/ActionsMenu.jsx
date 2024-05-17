import { getFirestore, deleteDoc, doc } from "firebase/firestore";
import app from "../../../firebaseConfig";

import { MoreHorizontal, CircleCheck } from "lucide-react";
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
  DialogDescription,
} from "@/components/ui/dialog";

import { toast } from "sonner";
import EditAgent from "./EditAgent";
import MoreDetailsComp from "./MoreDetails";

const DeleteModal = ({ agent }) => {
  const [confirmText, setConfirmText] = useState("");

  const id = agent.id;
  const deleteAgent = async () => {
    if (confirmText === agent.FullName) {
      try {
        const db = getFirestore(app);
        const agentRef = doc(db, "Agents", id);
        await deleteDoc(agentRef);
        toast(
          <div className="p-3 bg-white border border-neutral-300 rounded-[0.4rem] flex items-center gap-2 w-full">
            <CircleCheck
              size={16}
              className="stroke-neutral-600 md:text-sm text-neutral-800"
            />
            Agent successfully deleted
          </div>
        );
        setConfirmText(" ");
      } catch (error) {
        throw error;
      }
    } else {
      alert("Enter the confimation text");
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <button className="gap-2 items-center text-xs md:text-sm hover:!bg-neutral-200 w-full h-full rounded-[0.4rem] !cursor-pointer transition-all  px-2 py-1.5 text-left">
          Remove User
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white w-[90%] !rounded-[0.5rem] gap-5">
        <DialogHeader>
          <DialogTitle className="text-start md:text-xl">
            Remove Agent
          </DialogTitle>
          <DialogDescription>
            <p className="text-sm md:text-base">
              Are you sure you want to permanently remove {agent.FullName} from
              our servers?
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="productName"
            className="text-xs text-neutral-600 font-normal md:text-sm select-none pointer-events-none"
          >
            Enter the agent name{" "}
            <span className="font-semibold">{agent.FullName}</span> to continue:
          </Label>
          <Input
            type="text"
            id="agentName"
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
                onClick={deleteAgent}
                className="bg-black text-white rounded-[0.4rem] text-xs py-2 p-3 flex items-center gap-1 md:gap-2 font-medium md:text-base lg:px-6"
              >
                Confirm
              </button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const BanModal = ({ agent }) => {
  const banAgent = () => {};
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <button className="gap-2 text-left items-center text-xs md:text-sm  rounded-[0.4rem] !cursor-pointer hover:!bg-neutral-200 w-full h-full transition-all px-2 py-1.5">
          Ban User
        </button>
      </DialogTrigger>
      <DialogContent className="bg-white w-[90%] !rounded-[0.5rem] gap-5">
        <DialogHeader>
          <DialogTitle className="text-start md:text-xl">
            Ban {agent.Fullname}
          </DialogTitle>
          <DialogDescription>
            Ban agent from accessing the application
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex items-end">
          <div className="flex justify-end w-full gap-2">
            <DialogClose>
              <button
                onClick={banAgent}
                className="bg-black text-white rounded-[0.4rem] text-xs py-2 p-3 flex items-center gap-1 md:gap-2 font-medium md:text-base lg:px-6"
              >
                Confirm
              </button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const AgentsActionMenu = ({ agent }) => {
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
            {" "}
            <div className="w-full">
              <MoreDetailsComp agent={agent} />
            </div>
            <div className="w-full">
              <EditAgent agent={agent} />
            </div>
            <div className="w-full">
              <BanModal agent={agent} />
            </div>
            <div className="w-full ">
              <DeleteModal agent={agent} />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </Dialog>
    </>
  );
};

export default AgentsActionMenu;
