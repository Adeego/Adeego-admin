import {
  getFirestore,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

import app from "../../../firebaseConfig";

//!COMPONNTS;
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import EditForm from "./EditForm";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const EditAgent = ({ agent }) => {
  // states for input fields
  const [id, setUserId] = useState(agent.id);
  const [FullName, setFullName] = useState(agent.FullName);
  const [Code, setCode] = useState(agent.Code);
  const [Occupation, setOccupation] = useState(agent.Occupation);
  const [Referred, setReferred] = useState(agent.Referred);
  const [Wallet, setWallet] = useState(agent.Wallet);

  const agentObj = {
    id,
    FullName,
    Code,
    Occupation,
    Referred,
    Wallet,
  };

  const editAgentFxns = {
    updateUserId: (value) => setUserId(value),
    updateFullName: (value) => setFullName(value),
    updateCode: (value) => setCode(value),
    updateOccupation: (value) => setOccupation(value),
    updateReferred: (value) => setReferred(value),
    updateWallet: (value) => setWallet(value),
  };

  // Update the product details
  const handleApplyChanges = async () => {
    const fieldsToUpdate = {
      id,
      FullName,
      Code,
      Occupation,
      Referred,
      Wallet,
      Updated: serverTimestamp(),
    };
    try {
      const db = getFirestore(app);
      await updateDoc(doc(db, "Agents", agent.id), fieldsToUpdate);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="md:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <button className="gap-2 items-center text-xs md:text-sm hover:bg-neutral-100 hover:md:!bg-neutral-200/60 transition !cursor-pointer text-start p-2 rounded-[0.3rem]">
              Edit Agent
            </button>
          </DrawerTrigger>
          <DrawerContent className="bg-white  rounded-t-[1.4rem]">
            <div className="h-full overflow-y-scroll max-h-[85vh]">
              <DrawerHeader className="text-left">
                <DrawerTitle>Edit Agent</DrawerTitle>
                <DrawerDescription className="text-xs text-neutral-500">
                  Make changes to your Agent here. Click save when you're done.
                </DrawerDescription>
              </DrawerHeader>
              <EditForm agent={agentObj} editAgentFxns={editAgentFxns} />
              <DrawerFooter className="">
                <div className="flex items-center justify-end gap-2 w-full">
                  <DrawerClose asChild className="max-w-fit">
                    <button className="p-2 px-6 border border-neutral-200 text-xs  rounded-[0.3rem]">
                      cancel
                    </button>
                  </DrawerClose>
                  <button
                    onClick={handleApplyChanges}
                    className="p-2 px-6 bg-black text-white text-xs  rounded-[0.3rem]"
                  >
                    confirm
                  </button>
                </div>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="hidden md:block">
        <AlertDialog>
          <AlertDialogTrigger className="w-full">
            <button className="gap-2 items-center text-xs md:text-sm hover:!bg-neutral-200/60 transition !cursor-pointer p-1.5 px-2 rounded-[0.3rem] w-full text-left">
              Edit Agent
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white !rounded-[0.5rem]">
            <AlertDialogHeader>
              <AlertDialogTitle>Edit Agent?</AlertDialogTitle>
              <AlertDialogDescription>
                Make changes to your Agent here. Click save when you're done.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <EditForm agent={agentObj} editAgentFxns={editAgentFxns} />{" "}
            <AlertDialogFooter>
              <AlertDialogCancel className="border border-neutral-300 rounded-[0.3rem]">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction>
                <button
                  onClick={handleApplyChanges}
                  className="p-2 px-6 bg-black text-white  rounded-[0.3rem]"
                >
                  confirm
                </button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
};

export default EditAgent;
