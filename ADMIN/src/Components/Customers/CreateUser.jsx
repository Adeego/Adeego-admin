import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  runTransaction,
} from "firebase/firestore";

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CreateUser = () => {
  const [address, setAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passcode, setPasscode] = useState("");
  const [phone, setPhone] = useState("");
  const [tier, setTier] = useState("New");
  const [verified, setVerified] = useState(false);
  const [area, setArea] = useState("Select your area");
  const [estate, setEstate] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [refCode, setRefCode] = useState("");
  const [agent, setAgent] = useState(false);

  const registerUser = async () => {
    try {
      const db = getFirestore(app);
      const userRef = collection(db, "Users");

      const userData = {
        Address: address,
        CreatedAt: serverTimestamp(),
        FirstName: firstName,
        LastName: lastName,
        Passcode: passcode,
        Phone: phone,
        ReferredBy: "",
        Tier: tier,
        UpdatedAt: serverTimestamp(),
        Verified: verified,
      };

      const newUser = await addDoc(userRef, userData);
    } catch (error) {
      console.error(error);
    }
  };

  const createAccount = async () => {
    try {
      const db = getFirestore(app);
      const userRef = collection(db, "User");
      const userData = {
        FirstName: firstName,
        LastName: lastName,
        Phone: phone,
        Passcode: passcode,
        ReferredBy: refCode,
        Tier: "New",
        Verified: false,
        CreatedAt: serverTimestamp(),
        UpdatedAt: serverTimestamp(),
      };

      const newUserRef = await addDoc(userRef, userData);
      return newUserRef.id;
    } catch (error) {
      throw error;
    }
  };
  const createNewUser = async () => {
    try {
      const db = getFirestore(app);
      const commonData = {
        Items: [],
        CreatedAt: serverTimestamp(),
        UpdatedAt: serverTimestamp(),
      };

      const transactionResult = await runTransaction(
        db,
        async (transaction) => {
          const cartRef = collection(db, "Cart");
          const newCartRef = await addDoc(cartRef, commonData);

          const collectionRef = collection(db, "Collection");
          const newCollectionRef = await addDoc(collectionRef, commonData);

          const addressRef = collection(db, "Address");

          const addressData = {
            Country: "Kenya",
            City: "Nairobi",
            Area: area,
            Estate: estate,
            HouseNo: houseNumber, // Use the newCartRef.id as UserId
            CreatedAt: serverTimestamp(),
            UpdatedAt: serverTimestamp(),
          };

          const newAddressRef = await addDoc(addressRef, addressData);

          return {
            cartId: newCartRef.id,
            collectionId: newCollectionRef.id,
            addressId: newAddressRef.id,
          };
        }
      );

      const { cartId, collectionId, addressId } = transactionResult;

      // Create user document
      await createAccount();

      toast.success("Registration successiful");
    } catch (error) {
      console.error("Error adding user to Database:", error);
      throw error;
    }
  };
  
  const verifyUser = async () => {
    try {
      // Check if user exists in the database
      const db = getFirestore(app);
      const number = phone;
      const userRef = collection(db, "User");
      const userQuery = query(userRef, where("Phone", "==", number));
      const querySnapshot = await getDocs(userQuery);
      // Check if any documents match the query
      if (!querySnapshot.empty) {
        toast(`${phone} already exists! Login`);
      } else if (phone !== confirmPhone || passcode !== confirmPasscode) {
        toast("Phone number or passcode do not match");
      } else {
        createNewUser();
      }
    } catch (err) {
      throw err;
    }
  };
  const verifyAgent = async () => {
    try {
      // Check if user exists in the database
      const db = getFirestore(app);
      const code = refCode;
      const agentRef = collection(db, "Agents");
      const agentQuery = query(agentRef, where("Code", "==", code));
      const querySnapshot = await getDocs(agentQuery);
      // Check if any documents match the query #DC143C
      if (!querySnapshot.empty) {
        toast(`${refCode} referral code has been verified`);
      } else if (querySnapshot.empty) {
        toast("referral code does not exist");
      }
    } catch (err) {
      throw error;
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="w-full">
          <button className="w-10 aspect-square md:aspect-auto md:w-auto md:h-10 rounded-[0.4rem] border-neutral-200 grid place-items-center bg-black text-white md:flex gap-2 md:px-4 hover:bg-neutral-800 ">
            <CirclePlus className="h-[15px] w-[15px] stroke-white  select-none pointer-events-none" />
            <span className="hidden md:block text-xs font-medium select-none pointer-events-none">
              Register User
            </span>
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white !rounded-[0.5rem] w-[95%] text-left">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-left">
              Register User
            </AlertDialogTitle>
            <AlertDialogDescription className="text-left">
              Add a new user and click continue when you're done.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <form action="" className="flex flex-col gap-4">
            <div className="grid w-full items-center gap-1.5">
              <Label
                htmlFor="firstName"
                className="font-medium text-xs md:text-sm select-none pointer-events-none"
              >
                First Name <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label
                htmlFor="lastName"
                className="font-medium text-xs md:text-sm select-none pointer-events-none"
              >
                Last Name <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
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
                htmlFor="phone"
                className="font-medium text-xs md:text-sm select-none pointer-events-none"
              >
                Phone <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label
                htmlFor="phone"
                className="font-medium text-xs md:text-sm select-none pointer-events-none"
              >
                Referral Code <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="phone"
                value={refCode}
                onChange={(e) => setRefCode(e.target.value)}
                placeholder="Referral Code"
                className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
              />
            </div>

            <div>
              <p className="text-sm my-3 font-medium text-neutral-500">
                Address Information
              </p>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label
                htmlFor="area"
                className="font-medium text-xs md:text-sm select-none pointer-events-none"
              >
                Area <span className="text-red-500">*</span>
              </Label>
              <Select onValueChange={(value) => setArea(value)}>
                <SelectTrigger className="w-full text-xs  md:text-sm border-neutra-200 rounded-[0.3rem] focus:border-neutral-600">
                  <SelectValue placeholder={`${area}`} />
                </SelectTrigger>
                <SelectContent className=" bg-white rounded-[0.3rem]">
                  <SelectItem
                    className="text-xs md:text-sm !cursor-pointer hover:!bg-neutral-100 rounded-[0.3rem]"
                    value={"South B"}
                  >
                    South B
                  </SelectItem>
                  <SelectItem
                    className="text-xs md:text-sm !cursor-pointer hover:!bg-neutral-100 rounded-[0.3rem]"
                    value={"South C"}
                  >
                    South C
                  </SelectItem>
                  <SelectItem
                    className="text-xs md:text-sm !cursor-pointer hover:!bg-neutral-100 rounded-[0.3rem]"
                    value={"Nairobi West"}
                  >
                    Nairobi West
                  </SelectItem>
                </SelectContent>
              </Select>{" "}
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label
                htmlFor="estate"
                className="font-medium text-xs md:text-sm select-none pointer-events-none"
              >
                Estate <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="estate"
                value={estate}
                onChange={(e) => setEstate(e.target.value)}
                placeholder="Estate"
                className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label
                htmlFor="houseNo"
                className="font-medium text-xs md:text-sm select-none pointer-events-none"
              >
                House Number <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="houseNo"
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
                placeholder="House Number"
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
                registerUser();
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

export default CreateUser;
