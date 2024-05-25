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
import { formatPrice } from "../../lib/utils";
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

const DetailsBody = ({ order, user, address }) => {
  const subTotal =
    order.Items.length > 0
      ? order.Items.map((item) => item.Price*item.Quantity).reduce((a, b) => a + b)
      : 0;
  const formatSubtotal = formatPrice(subTotal);
  const shipping = formatPrice(200);
  const totalPrice = formatPrice(subTotal);

  
  return (
    <>
      <div className="flex flex-col gap-6 text-xs md:text-sm mt-16">
        {/* order details */}
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold">Order details</h1>
          <div className="flex flex-col gap-1">
            {order.Items.length > 0 ? (
              order.Items.map((item, i) => {
                const formatPrice = new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "KES",
                }).format(item.Price);
                return (
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-neutral-500">
                        {item.Quantity} x {item.Name} ({item.Size})
                      </p>
                    </div>
                    <div>
                      <p className="text-black">{formatPrice}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-neutral-500">No items available</div>
            )}
          </div>
        </div>
        <Separator orientation="horizontal" className="bg-neutral-200" />
        <div className="flex flex-col gap-3">
          <div className="w-full flex items-center justify-between">
            <div className="text-neutral-500">Subtotal</div>
            <div className="text-black">{formatSubtotal}</div>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="text-neutral-500">Delivery</div>
            <div className="text-black">Free</div>
          </div>
          <div className="w-full flex items-center justify-between mt-2">
            <div className="text-neutral-800">Total</div>
            <div className="text-black font-semibold">{totalPrice}</div>
          </div>
        </div>
        <Separator orientation="horizontal" className="bg-neutral-200" />
        {/* customer info */}
        {user.FirstName ? (
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
              <div className="text-black">{order.UserId}</div>
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="text-neutral-500">Phone Number</div>
              <div className="text-black">{user.Phone}</div>
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
        {/* payment info */}
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold">Payment information</h1>
          <div className="w-full flex items-center justify-between">
            <div className="text-neutral-500">Status</div>
            <div className="text-black flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${
                  order.PaymentStatus == "Unpaid"
                    ? "bg-red-500"
                    : "bg-green-500"
                }`}
              ></div>
              {order.PaymentStatus}
            </div>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="text-neutral-500">Payment method</div>
            <div className="text-black flex items-center gap-2">{order.PMethod}</div>
          </div>
        </div>
      </div>
      <div className="mt-10 pb-3">
        <small className="text-neutral-600 text-xs md:text-md">
          Updated on November 28, 2024
        </small>
      </div>
    </>
  );
};

const MoreDetailsMobile = ({ order, address, user }) => {
  return (
    <div className="md:hidden">
      <Drawer>
        <DrawerTrigger className="w-full">
          <button className="gap-2 items-center text-xs md:text-sm hover:!bg-neutral-200/60 transition !cursor-pointer p-1.5 px-2 rounded-[0.3rem] w-full text-left">
            More details
          </button>
        </DrawerTrigger>
        <DrawerContent className="bg-white">
          <ScrollArea className="h-[80vh]">
            <DrawerHeader className="text-left flex flex-col gap-2 mb-6">
              <DrawerTitle className="tracking-tight">
                Order <code className="">{order.id}</code>
              </DrawerTitle>
              <p className="text-xs text-neutral-600 leading-none">
                Date: November 23, 2023
              </p>
              <p className=" text-neutral-600 text-xs pt-2">
                Status :{" "}
                <span className="text-black font-semibold">
                  {order.OrderStatus}
                </span>
              </p>{" "}
            </DrawerHeader>
            <div className="px-4">
              <DetailsBody order={order} user={user} address={address} />
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

const MoreDetailsLg = ({ order, user, address }) => {
  return (
    <div className="hidden md:block ">
      <Sheet>
        <SheetTrigger className="w-full">
          <button className="gap-2 items-center text-xs md:text-sm hover:!bg-neutral-200/60 transition !cursor-pointer p-1.5 px-2 rounded-[0.3rem] w-full text-left">
            More details
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="bg-white w-full sm:max-w-lg  text-sm "
        >
          <ScrollArea className='w-full max-h-[100vh] flex flex-col gap-12 pb-10'>
            <SheetHeader className='pt-8'>
              <SheetTitle className="tracking-tight">
                Order <code className="">{order.id}</code>
              </SheetTitle>
              <p className="text-sm text-neutral-600 leading-none">
                Date: November 23, 2023
              </p>

              <p className="pt-4 text-neutral-600">
                Status :{" "}
                <span className="text-black font-medium">
                  {order.OrderStatus}
                </span>
              </p>
            </SheetHeader>
            <DetailsBody order={order} user={user} address={address} />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};

const MoreDetailsComp = ({ order }) => {
  const [addressId, setAddressId] = useState("");
  const [userId, setUserId] = useState(order.UserId);
  const [user, setUser] = useState({});
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
    const fetchData = async () => {
      const data = await getData("User", userId);
      setUser(data);
      setAddressId(data.AddressId);
    };

    fetchData();
  }, [userId]);

  useEffect(() => {
    const fetchAddress = async () => {
      if (addressId === null) {
        return;
      } else {
        const data = await getData("Address", addressId);
        setAddress(data);
      }
    };

    fetchAddress();
  }, [addressId]);

  console.log(order);

  return (
    <>
      <MoreDetailsMobile order={order} user={user} address={address} />
      <MoreDetailsLg order={order} user={user} address={address} />
    </>
  );
};

export default MoreDetailsComp;
