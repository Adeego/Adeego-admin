// components;
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import { Separator } from "@/components/ui/separator";
import { convertFirestoreTimestampToDate, formatPrice } from "../../lib/utils";
import app from "../../../firebaseConfig";
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const SkeletonComp = () => {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <Skeleton className="bg-neutral-300 w-1/4 rounded-[0.3rem] h-5" />
      </div>
      <div className="flex flex-col gap-2">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center justify-between">
            <Skeleton className="w-2/4 bg-neutral-200 h-5 rounded-[0.3rem]" />
            <Skeleton className="w-1/4 bg-neutral-200 h-5 rounded-[0.3rem]" />
          </div>
        ))}
      </div>
    </div>
  );
};

const DetailsBody = ({ user, address }) => {
  return (
    <>
      <div className="flex flex-col gap-6 text-xs md:text-sm">
        {/* customer info */}
        {user ? (
          <div className="flex flex-col gap-3">
            <h1 className="font-semibold">Customer information</h1>
            <div className="w-full flex items-center justify-between">
              <div className="text-neutral-500">Customer name</div>
              <div className="text-black capitalize">
                {user.FirstName + " " + user.LastName}
              </div>
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="text-neutral-500">Customer ID</div>
              <div className="text-black">{user.id}</div>
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="text-neutral-500">Phone Number</div>
              <div className="text-black">{user.Phone}</div>
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="text-neutral-500">Tier</div>
              <div className="text-black">{user.Tier}</div>
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="text-neutral-500">Verified</div>
              <div className="text-black">{user.Verified.toString()}</div>
            </div>
          </div>
        ) : (
          <SkeletonComp />
        )}
        <Separator orientation="horizontal" className="bg-neutral-200" />
        {/* shipping info */}
        {address ? (
          <div className="flex flex-col gap-3">
            <h1 className="font-semibold">Address information</h1>
            <div className="w-full flex items-center justify-between">
              <div className="text-neutral-500">Area of residence</div>
              <div className="text-black">
                {address.Area} , {address.City}
              </div>
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="text-neutral-500">Estate</div>
              <div className="text-black">{address.Estate}</div>
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="text-neutral-500">House No.</div>
              <div className="text-black">{address.HouseNo}</div>
            </div>
          </div>
        ) : (
          <SkeletonComp />
        )}
        <Separator orientation="horizontal" className="bg-neutral-200" />
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold">Registration information</h1>
          <div className="w-full flex items-center justify-between">
            <div className="text-neutral-500">Joined on</div>
            <div className="text-black">
              {convertFirestoreTimestampToDate(user.CreatedAt)}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 pb-3">
        <small className="text-neutral-600 text-xs md:text-md">
          Updated on {convertFirestoreTimestampToDate(user.UpdatedAt)}
        </small>
      </div>
    </>
  );
};

const MoreDetailsMobile = ({ address, user }) => {
  return (
    <div className="md:hidden">
      <Drawer>
        <DrawerTrigger className="w-full">
          <button className="gap-2 items-center text-xs md:text-sm hover:!bg-neutral-200/60 transition !cursor-pointer rounded-[0.3rem] w-full text-left">
            More details
          </button>
        </DrawerTrigger>
        <DrawerContent className="bg-white pb-10">
          <ScrollArea className="">
            <DrawerHeader className="text-left flex flex-col gap-2 mb-6">
              <DrawerTitle className="tracking-tight">
                {user.FirstName + " " + user.LastName}
              </DrawerTitle>
            </DrawerHeader>
            <div className="px-4">
              <DetailsBody user={user} address={address} />
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

const MoreDetailsLg = ({ user, address }) => {
  return (
    <div className="hidden md:block ">
      <Sheet>
        <SheetTrigger className="w-full">
          <button className="gap-2 items-center text-xs md:text-sm hover:!bg-neutral-200/60 transition !cursor-pointer rounded-[0.3rem] w-full text-left">
            More details
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="bg-white w-full sm:max-w-lg flex flex-col gap-12 text-sm md:text- py-16"
        >
          <SheetHeader>
            <SheetTitle className="tracking-tight">
              {user.FirstName + " " + user.LastName}
            </SheetTitle>
          </SheetHeader>
          <DetailsBody user={user} address={address} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

const MoreDetailsComp = ({ customer }) => {
  const [address, setAddress] = useState(null);

  async function getData(collectionName, userId) {
    try {
      const db = getFirestore(app);
      const userRef = doc(db, collectionName, userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists) {
        return userSnap.data();
      } else {
        // Handle the case where user data is not found
        console.warn(`${collectionName} data not found for user:`, userId);
        return null;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

  useEffect(() => {
    const fetchAddress = async () => {
      if (customer.AddressId === null) {
        return;
      } else {
        const data = await getData("Address", customer.AddressId);
        setAddress(data);
      }
    };

    fetchAddress();
  }, []);
console.log(customer)
  return (
    <>
      <MoreDetailsMobile user={customer} address={address} />
      <MoreDetailsLg user={customer} address={address} />
    </>
  );
};

export default MoreDetailsComp;
