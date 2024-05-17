import { getFirestore, collection, addDoc } from "firebase/firestore";

import app from "../../../firebaseConfig";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CirclePlus } from "lucide-react";
import { useState } from "react";

const RegisterAgent = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [occupation, setOccupation] = useState("");
  const [code, setCode] = useState("");

  const registerAgent = async () => {
    try {
      const db = getFirestore(app);
      const agentRef = collection(db, "Agents");

      const agentData = {
        FullName: name,
        Code: code,
        Address: address,
        Occupation: occupation,
        Referred: 0,
        Wallet: 0,
      };

      const newAgent = await addDoc(agentRef, agentData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="w-full">
          <button className="w-10 aspect-square md:aspect-auto md:w-auto md:h-10 rounded-[0.4rem] border-neutral-200 grid place-items-center bg-black text-white md:flex gap-2 md:px-4 hover:bg-neutral-800 ">
            <CirclePlus className="h-[15px] w-[15px] stroke-white  select-none pointer-events-none" />
            <span className="hidden md:block text-xs font-medium select-none pointer-events-none">
              Register Agent
            </span>
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white !rounded-[0.5rem] w-[95%] text-left">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-left">
              Register Agent
            </AlertDialogTitle>
            <AlertDialogDescription className="text-left">
              Add a new agent and click continue when you're done.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <form action="" className=" flex flex-col gap-4">
            <div className="grid w-full items-center gap-1.5">
              <Label
                htmlFor="userId"
                className="font-medium text-xs md:text-sm select-none pointer-events-none"
              >
                Name <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label
                htmlFor="address"
                className="font-medium text-xs md:text-sm select-none pointer-events-none"
              >
                Address <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
                className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label
                htmlFor="userId"
                className="font-medium text-xs md:text-sm select-none pointer-events-none"
              >
                Occupation <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="occupation"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                placeholder="Occupation"
                className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label
                htmlFor="code"
                className="font-medium text-xs md:text-sm select-none pointer-events-none"
              >
                Code <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Code"
                className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
              />
            </div>
          </form>

          <AlertDialogFooter>
            <AlertDialogCancel className="border border-neutral-300 rounded-[0.3rem]">
              Cancel
            </AlertDialogCancel>
            <button
              onClick={(e) => {
                e.preventDefault();
                registerAgent();
              }}
              className="bg-black text-white rounded-[0.3rem] text-sm font-medium p-2 px-3"
            >
              Continue
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RegisterAgent;
