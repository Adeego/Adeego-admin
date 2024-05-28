import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import app from "../../../firebaseConfig";

// components
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

import Receipt from "./Receipt";
import { Link } from "react-router-dom";
import { Image, X } from "lucide-react";
import EditForm from "./EditForm";
import LgEditForm from "./LgEditForm";

const orderStatusOptions = [
  { status: "Pending", value: "Pending" },
  { status: "Completed", value: "Completed" },
];

const statusOptions = [
  { status: "Pending", value: "Pending" },
  { status: "Processing", value: "Processing" },
  { status: "Out for Delivery", value: "Out for Delivery" },
  { status: "Delivered", value: "Delivered" },
  { status: "Cancelled", value: "Cancelled" },
];

const paymentOptions = [
  { status: "Unpaid", value: "Unpaid" },
  { status: "Paid", value: "Paid" },
];

// comp;
function EditOrder({ order }) {
  // states for input fields
  const [userId, setUserId] = useState(order.UserId);
  const [orderStatus, setOrderStatus] = useState(order.OrderStatus);
  const [status, setStatus] = useState(order.Status);
  const [paymentStatus, setPaymentStatus] = useState(order.PaymentStatus);
  const [paymentMethod, setPaymentMethod] = useState(order.PMethod || "");
  const [items, setItems] = useState([...order.Items]);
  const [totalItems, setTotalItems] = useState(items.length);
  const [customer, setCustomer] = useState(null);
  const [addressId, setAddressId] = useState(null);
  const [addressData, setAddressData] = useState(null);
  const [totalAmount, setTotalAmount] = useState(order.TotalAmount);

  const orderObj = {
    userId,
    orderStatus,
    status,
    totalItems,
    totalAmount,
    paymentStatus,
    items,
    paymentMethod,
  };

  const editOrderFxns = {
    updateUserId: (value) => setUserId(value),
    updateOrderStatus: (value) => setOrderStatus(value),
    updateStatus: (value) => setStatus(value),
    removeItem: (value) => {
      const existingItem = items.find(
        (existingItem) => existingItem.id === value
      );

      console.log(existingItem)

      if (existingItem.Quantity > 1) {
        existingItem.Quantity -= 1;
        setItems([...items]);
        return;
      }

      const newArr = items.filter((item) => item.id !== value);
      setItems(newArr);
    },
    updateAmount: (value) => setAmount(value),
    updatePaymentStatus: (value) => setPaymentStatus(value),
    updatePaymentMethod: (value) => setPaymentMethod(value),
  };

  async function getData(collectionName, userId) {
    try {
      const db = getFirestore(app);
      const userRef = doc(db, collectionName, userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists) {
        return userSnap.data();
      } else {
        // Handle the case where user data is not found
        alert.warn(`${collectionName} data not found for user:`, userId);
        return null;
      }
    } catch (error) {
      alert.error("Error fetching data:", error);
      return null;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("User", userId);
      setCustomer(data);
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
        setAddressData(data);
      }
    };

    fetchAddress();
  }, [addressId]);

  // Update the order details
  const handleApplyChanges = async () => {
    const fieldsToUpdate = {
      UserId: userId,
      AddessId: addressId,
      OrderStatus: orderStatus,
      Status: status,
      PaymentStatus: paymentStatus,
      PMethod: paymentMethod,
      Profit: profit,
      items: itemList,
      TotalItems: itemList.length,
      TotalAmount: totalAmount,
    };

    try {
      const db = getFirestore(app);
      // Update the order in Firestore
      await updateDoc(doc(db, "Orders", order.id), fieldsToUpdate);

      // Handle success (e.g., display a success message or navigate back)
      alert("Product updated successfully!");

      // Callif needed
    } catch (error) {
      // Handle errors (e.g., display an error message to the user)
      alert.error("Error updating order:", error);
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="md:hidden">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <button className="gap-2 items-center text-xs md:text-sm hover:bg-neutral-100 hover:md:!bg-neutral-200/60 transition !cursor-pointer text-start p-2 rounded-[0.3rem]">
              Edit Order
            </button>
          </DrawerTrigger>
          <DrawerContent className="bg-white  rounded-t-[1.4rem]">
            <div className="h-full overflow-y-scroll max-h-[85vh]">
              <DrawerHeader className="text-left">
                <DrawerTitle>Edit Order</DrawerTitle>
                <DrawerDescription className="text-xs text-neutral-500">
                  Make changes to your order here. Click save when you're done.
                </DrawerDescription>
              </DrawerHeader>
              <EditForm order={orderObj} editOrderFxns={editOrderFxns} />
              <DrawerFooter className="">
                <div className="flex items-center justify-end gap-2 w-full">
                  <DrawerClose asChild className="max-w-fit">
                    <button className="p-2 px-6 border border-neutral-200 text-xs  rounded-[0.3rem]">
                      cancel
                    </button>
                  </DrawerClose>
                  <DrawerClose asChild className="max-w-fit">
                    <button
                      onClick={handleApplyChanges}
                      className="p-2 px-6 bg-black text-white text-xs  rounded-[0.3rem]"
                    >
                      confirm
                    </button>
                  </DrawerClose>
                </div>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="hidden md:block w-full">
        <LgEditForm
          order={orderObj}
          editOrderFxns={editOrderFxns}
          handleApplyChanges={handleApplyChanges}
        />
      </div>
    </>
  );
}

export default EditOrder;
