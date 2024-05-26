import {
  getFirestore,
  onSnapshot,
  query,
  collection,
  deleteDoc,
  doc,
} from "firebase/firestore";

import app from "../../../firebaseConfig";

import CreateOrderComp from "./ProductSearch/CreateOrderComp";

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
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, ChevronsUpDown, CirclePlus } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CommandList } from "cmdk";
import { getData } from "../../lib/utils";
import OrderStore from "../../Store/OrderStore";

const SelectUser = ({ updateUser }) => {
  // update functions
  const { updateAddress, updatePhoneNumber, updateReferredBy } = updateUser;

  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [addressId, setAddress] = useState("");

  useEffect(() => {
    let unsubscribe;

    const fetchData = async () => {
      try {
        const db = getFirestore(app);
        const q = query(collection(db, "User")); // change user to agents.

        unsubscribe = onSnapshot(q, (querySnapshot) => {
          const user = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setData(user);
        });
        console.log(user);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    // Cleanup function to detach the listener on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const fetchAddress = async (id) => {
    const data = await getData("Address", id);
    updateAddress(
      `${data.Estate} House ${data.HouseNo}, ${data.Area}, ${data.City}, ${data.Country}`
    );
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="text-left rounded-[0.4rem] border border-neutral-300 w-full !flex !justify-between"
        >
          {user ? user : "Select user"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 rounded-[0.4rem] bg-white">
        {data.length > 0 && (
          <Command>
            <CommandInput
              placeholder="Search User..."
              className="h-9 bg-white"
            />
            <CommandEmpty>No User found.</CommandEmpty>
            <CommandGroup className="w-full bg-white ">
              <CommandList className="max-h-[300px] overflow-y-scroll custom_scrollbar">
                {data.map((userItem, i) => {
                  const name = userItem.FirstName + " " + userItem.LastName;
                  return (
                    <CommandItem
                      value={name + userItem.Phone}
                      key={name + i}
                      onSelect={() => {
                        setUser(name);
                        updateReferredBy(userItem.ReferredBy);
                        updatePhoneNumber(userItem.Phone);
                        fetchAddress(userItem.AddressId);
                      }}
                      className="capitalize w-full flex items-center justify-between hover:!bg-neutral-200 "
                    >
                      {name}
                      <Check
                        className={`${
                          name === user ? "opacity-100" : "opacity-0"
                        }`}
                        size={18}
                      />
                    </CommandItem>
                  );
                })}
              </CommandList>
            </CommandGroup>
          </Command>
        )}
      </PopoverContent>
    </Popover>
  );
};

const CreateOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [address, setAddress] = useState("");
  const [totalItems, setTotalItems] = useState("");
  const [amount, setAmount] = useState("");
  const [referredBy, setReferredBy] = useState("");
  const [phone, setPhone] = useState("");

  // functions
  const updateUser = {
    updateReferredBy: (value) => setReferredBy(value),
    updateAddress: (value) => setAddress(value),
    updatePhoneNumber: (value) => setPhone(value),
  };

  // import order store
  const { items, itemList } = OrderStore();
  const totalAmount =
    itemList.length > 0
      ? itemList
          .map((item) => item.Price * item.Quantity)
          .reduce((a, b) => a + b)
      : 0;
  console.log(itemList);
  return (
    <div className="w-full">
      <AlertDialog>
        <AlertDialogTrigger className="w-full">
          <button className="w-10 aspect-square md:aspect-auto md:w-auto md:h-10 rounded-[0.4rem] border-neutral-200 grid place-items-center bg-black text-white md:flex gap-2 md:px-4 hover:bg-neutral-800 ">
            <CirclePlus className="h-[15px] w-[15px] stroke-white  select-none pointer-events-none" />
            <span className="hidden md:block text-xs font-medium select-none pointer-events-none">
              Create Order
            </span>
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white !rounded-[0.5rem] md:max-w-[750px] text-left">
          <ScrollArea className="max-h-[90vh]">
            <AlertDialogHeader className="mb-10">
              <AlertDialogTitle className="text-left">
                Create Order
              </AlertDialogTitle>
              <AlertDialogDescription className="text-left">
                Create an order and click continue when you're done.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <form action="" className=" flex flex-col gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label className="font-medium text-xs md:text-sm select-none pointer-events-none">
                  Select user <span className="text-red-500">*</span>
                </Label>
                {/* Select user full search */}
                <SelectUser updateUser={updateUser} />
              </div>

              <div className="grid gap-2">
                <Label
                  className="font-medium text-xs md:text-sm select-none pointer-events-none"
                  htmlFor="number"
                >
                  Phone
                </Label>
                <Input
                  id="number"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number"
                  className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label
                  className="font-medium text-xs md:text-sm select-none pointer-events-none"
                  htmlFor="number"
                >
                  Referred By
                </Label>
                <Input
                  id="referredBy"
                  type="text"
                  value={referredBy}
                  placeholder="Referred By"
                  className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm placeholder:text-neutral-500 w-full"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label
                  className="font-medium text-xs md:text-sm select-none pointer-events-none"
                  htmlFor="number"
                >
                  Address
                </Label>
                <Input
                  id="text"
                  type="text"
                  value={address}
                  // onChange={(e) => setAddressId(e.target.value)}
                  placeholder="Address"
                  className="border-neutral-200 cursor-not-allowed rounded-[0.4rem] text-xs md:text-sm placeholder:text-neutral-500 w-full"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label
                  className="font-medium text-xs md:text-sm select-none pointer-events-none"
                  htmlFor="number"
                >
                  Total Items
                </Label>
                <Input
                  id="number"
                  type="number"
                  value={itemList.length}
                  // onChange={(e) => setTotalItems(e.target.value)}
                  placeholder="Total Items"
                  className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label
                  className="font-medium text-xs md:text-sm select-none pointer-events-none"
                  htmlFor="number"
                >
                  Total Amount
                </Label>
                <Input
                  id="number"
                  type="number"
                  value={totalAmount}
                  // onChange={(e) => setAmount(e.target.value)}
                  placeholder="Total Amount"
                  className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
                  required
                />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label
                  htmlFor="userId"
                  className="font-medium text-xs md:text-sm select-none pointer-events-none"
                >
                  Payment Method <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => setPaymentMethod(value)}>
                  <SelectTrigger className="w-full text-xs  md:text-sm border-neutra-200 rounded-[0.3rem] focus:border-neutral-600">
                    <SelectValue placeholder={`Payment Method`} />
                  </SelectTrigger>
                  <SelectContent className=" bg-white rounded-[0.3rem]">
                    <SelectItem
                      className="text-xs md:text-sm !cursor-pointer hover:!bg-neutral-100 rounded-[0.3rem]"
                      value="MPESA"
                    >
                      MPESA
                    </SelectItem>
                    <SelectItem
                      className="text-xs md:text-sm !cursor-pointer hover:!bg-neutral-100 rounded-[0.3rem]"
                      value="Cash"
                    >
                      Cash
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid w-full items-center gap-1.5">
                <CreateOrderComp />
              </div>
            </form>

            <AlertDialogFooter>
              <AlertDialogCancel className="border border-neutral-300 rounded-[0.3rem]">
                Cancel
              </AlertDialogCancel>
              <button
                onClick={(e) => {
                  e.preventDefault();
                }}
                className="bg-black text-white rounded-[0.3rem] text-sm font-medium p-2 px-3"
              >
                Continue
              </button>
            </AlertDialogFooter>
          </ScrollArea>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CreateOrder;
