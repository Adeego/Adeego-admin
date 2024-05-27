import { doc, updateDoc, getFirestore } from "firebase/firestore";
import app from "../../../firebaseConfig";

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
import { CircleCheck } from "lucide-react";

const EditCustomer = ({ customer }) => {
  // states for input fields
  const [userId, setUserId] = useState(customer.id);
  const [firstName, setFirstName] = useState(customer.FirstName);
  const [lastName, setLastName] = useState(customer.LastName);
  const [phone, setPhone] = useState(customer.Phone);
  const [verified, setVerified] = useState(customer.Verified);
  const [addressId, setAddressId] = useState(customer.AddressId);
  const [cartId, setCartId] = useState(customer.CartId);
  const [tier, setTier] = useState(customer.Tier);
  const [referredBy, setReferredBy] = useState(customer.ReferredBy);

  const customerObj = {
    userId,
    firstName,
    lastName,
    phone,
    verified,
    addressId,
    cartId,
    tier,
    referredBy,
  };

  const editCustomerFxns = {
    updateUserId: (value) => setUserId(value),
    updateFirstName: (value) => setFirstName(value),
    updateLastName: (value) => setLastName(value),
    updatePhone: (value) => setPhone(value),
    updateVerified: (value) => setVerified(value),
    updateAddressId: (value) => setAddressId(value),
    updateCartId: (value) => setCartId(value),
    updateTier: (value) => setTier(value),
    updateReferredBy: (value) => setReferredBy(value),
  };

  // Update the product details
  const handleApplyChanges = async () => {
    const fieldsToUpdate = {
      UserId: userId,
      FirstName: firstName,
      LastName: lastName,
      Phone: phone,
      Verified: verified,
      AddressId: addressId,
      CartId: cartId,
      Tier: tier,
      ReferredBy: referredBy,
    };

    try {
      const db = getFirestore(app);
      await updateDoc(doc(db, "User", customer.id), fieldsToUpdate);

      toast(
        <div className="p-3 bg-white border border-neutral-300 rounded-[0.4rem] flex items-center gap-2 w-full">
          <CircleCheck
            size={16}
            className="stroke-neutral-600 md:text-sm text-neutral-800"
          />
          Customer edited successfully.
        </div>
      );
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
              Edit User
            </button>
          </DrawerTrigger>
          <DrawerContent className="bg-white  rounded-t-[1.4rem]">
            <div className="h-full overflow-y-scroll max-h-[85vh]">
              <DrawerHeader className="text-left">
                <DrawerTitle>Edit User</DrawerTitle>
                <DrawerDescription className="text-xs text-neutral-500">
                  Make changes to your User here. Click save when you're done.
                </DrawerDescription>
              </DrawerHeader>
              <EditForm
                customer={customerObj}
                editCustomerFxns={editCustomerFxns}
              />
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
              Edit User
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white !rounded-[0.5rem]">
            <AlertDialogHeader>
              <AlertDialogTitle>Edit User?</AlertDialogTitle>
              <AlertDialogDescription>
                Make changes to your User here. Click save when you're done.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <EditForm
              customer={customerObj}
              editCustomerFxns={editCustomerFxns}
            />{" "}
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

export default EditCustomer;
