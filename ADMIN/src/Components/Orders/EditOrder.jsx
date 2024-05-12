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


function EditOrder({ order }) {
  // states for input fields
  const [userId, setUserId] = useState(order.UserId);
  const [orderStatus, setOrderStatus] = useState(order.OrderStatus);
  const [status, setStatus] = useState(order.Status);
  const [totalItems, setTotalItems] = useState(order.TotalItems);
  const [totalAmount, setTotalAmount] = useState(order.TotalAmount);
  const [paymentStatus, setPaymentStatus] = useState(order.PaymentStatus);
  const [items, setItems] = useState(order.Items);
  const [customer, setCustomer] = useState(null);
  const [addressId, setAddressId] = useState(null);
  const [addressData, setAddressData] = useState(null);

  const orderObj = {
    userId,
    orderStatus,
    status,
    totalItems,
    totalAmount,
    paymentStatus,
    items,
  };

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

  //Functions to handle input fields changes
  const handleOrderStatusChange = (e) => {
    setOrderStatus(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handlePaymentStatusChange = (e) => {
    setPaymentStatus(e.target.value);
  };

  const handleDeleteItem = async (itemToDelete) => {
    const filteredItems = items.filter((item) => item !== itemToDelete);
    const newTotalAmount = filteredItems.reduce(
      (sum, item) => sum + item.Quantity * item.Price,
      0
    );

    setItems(filteredItems);
    setTotalItems(filteredItems.length);
    setTotalAmount(newTotalAmount);
  };

  // Clear input fields
  const clearInputFields = () => {
    setUserId("");
    setOrderStatus("");
    setStatus("");
    setTotalItems("");
    setTotalAmount("");
    setPaymentStatus("");
    setItems([]);
  };

  // Update the order details
  const handleApplyChanges = async () => {
    const fieldsToUpdate = {
      OrderStatus: orderStatus,
      Status: status,
      Items: items,
      TotalItems: totalItems,
      TotalAmount: totalAmount,
      PaymentStatus: paymentStatus,
    };

    try {
      const db = getFirestore(app);
      // Update the order in Firestore
      await updateDoc(doc(db, "Orders", order.id), fieldsToUpdate);

      // Handle success (e.g., display a success message or navigate back)
      alert("Product updated successfully!");

      // Clear input fields
      clearInputFields();
      // Callif needed
    } catch (error) {
      // Handle errors (e.g., display an error message to the user)
      alert.error("Error updating order:", error);
    }
  };

  const [open, setOpen] = useState(false);

  return (
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
              Make changes to your profile here. Click save when you're done.
            </DrawerDescription>
          </DrawerHeader>
          <EditForm order={orderObj} />
          <DrawerFooter className="">
            <div className="flex items-center justify-end gap-2 w-full">
              <DrawerClose asChild className="max-w-fit">
                <button className="p-2 px-6 border border-neutral-200 text-xs  rounded-[0.3rem]">
                  cancel
                </button>
              </DrawerClose>
              <button className="p-2 px-6 bg-black text-white text-xs  rounded-[0.3rem]">
                confirm
              </button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default EditOrder;
