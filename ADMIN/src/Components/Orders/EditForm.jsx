import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Image, X } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import EditOrderProduct from "./ProductSearchEditOrder/EditOrderProduct";

const OrderItem = ({ item, removeItem }) => {
  const [hasImageLoaded, setImageLoaded] = useState(true);
  return (
    <Dialog>
      <div className="relative flex gap-2 p-2 md:p-0 border md:border-none rounded-[0.3rem]">
        <div className="">
          <div className="h-10 md:h-12 rounded-[0.3rem] overflow-hidden aspect-square relative">
            <img
              src={item.Image}
              alt={item.Name}
              onLoad={() => setImageLoaded(false)}
              className={`${hasImageLoaded ? "hidden" : "block"}`}
            />
            <div
              className={`absolute top-0 left-0 w-full h-full grid place-items-center bg-neutral-200 ${
                hasImageLoaded ? "block" : "hidden"
              } text-neutral-500`}
            >
              <Image size={16} />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1 leading-none">
          <p className="text-xs md:text-sm font-medium text-neutral-800">
            {item.Name}
          </p>
          <div>
            <p className="text-xs md:text-sm text-neutral-500">
              Quantity : <span>{item.Quantity}</span>{" "}
            </p>
          </div>
        </div>

        <DialogTrigger>
          {/* button */}
          <button className="h-5 aspect-square bg-black rounded-full grid place-items-center absolute top-1 right-1 text-white">
            <X size={12} />
          </button>{" "}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white !rounded-[0.4rem]">
          <DialogHeader>
            <DialogTitle>Remove product</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this product?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <button
                className="font-medium p-2 px-3 bg-black rounded-[0.4rem] text-sm grid place-items-center text-white"
                onClick={() => {
                  removeItem(item.id);
                }}
                type="submit"
              >
                Confirm
              </button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </div>
    </Dialog>
  );
};

const EditForm = ({ order, editOrderFxns, addItem }) => {
  const {
    userId,
    orderStatus,
    status,
    totalItems,
    totalAmount,
    paymentStatus,
    paymentMethod,
    items,
  } = order;

  const amount =
    items.length > 0
      ? items.map((item) => item.Price * item.Quantity).reduce((a, b) => a + b)
      : 0;

  const {
    updateUserId,
    updateOrderStatus,
    updateStatus,
    removeItem,
    updateAmount,
    updatePaymentStatus,
    updatePaymentMethod,
  } = editOrderFxns;

  return (
    <>
      <form action="" className="p-2 px-4 md:px-0 flex flex-col gap-4">
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="userId"
            className="font-medium text-xs md:text-sm select-none pointer-events-none"
          >
            User ID
          </Label>
          <Input
            type="text"
            id="userId"
            value={userId}
            placeholder="User Id"
            onChange={(e) => updateUserId(e.target.value)}
            className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="orderStatus"
            className="font-medium text-xs md:text-sm select-none pointer-events-none"
          >
            Order Status
          </Label>
          <Select onValueChange={(value) => updateOrderStatus(value)}>
            <SelectTrigger className="w-full text-xs  md:text-sm border-neutra-200 rounded-[0.3rem] focus:border-neutral-600">
              <SelectValue placeholder={`${orderStatus}`} />
            </SelectTrigger>
            <SelectContent className=" bg-white rounded-[0.3rem]">
              <SelectItem
                className="text-xs md:text-sm !cursor-pointer hover:!bg-neutral-100 rounded-[0.3rem]"
                value="Pending"
              >
                Pending
              </SelectItem>
              <SelectItem
                className="text-xs md:text-sm !cursor-pointer hover:!bg-neutral-100 rounded-[0.3rem]"
                value="Completed"
              >
                Completed
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="Status"
            className="font-medium text-xs md:text-sm select-none pointer-events-none"
          >
            Status
          </Label>
          <Select onValueChange={(value) => updateStatus(value)}>
            <SelectTrigger className="w-full text-xs  md:text-sm border-neutra-200 rounded-[0.3rem] focus:border-neutral-600">
              <SelectValue placeholder={`${status}`} />
            </SelectTrigger>
            <SelectContent className=" bg-white rounded-[0.3rem]">
              <SelectItem
                className="text-xs md:text-sm !cursor-pointer hover:!bg-neutral-100 rounded-[0.3rem]"
                value="Pending"
              >
                Pending
              </SelectItem>
              <SelectItem
                className="text-xs md:text-sm !cursor-pointer hover:!bg-neutral-100 rounded-[0.3rem]"
                value="Processing"
              >
                Processing
              </SelectItem>
              <SelectItem
                className="text-xs md:text-sm !cursor-pointer hover:!bg-neutral-100 rounded-[0.3rem]"
                value="Out for delivery"
              >
                Out for delivery
              </SelectItem>
              <SelectItem
                className="text-xs md:text-sm !cursor-pointer hover:!bg-neutral-100 rounded-[0.3rem]"
                value="Delivered"
              >
                Delivered
              </SelectItem>
              <SelectItem
                className="text-xs md:text-sm !cursor-pointer hover:!bg-neutral-100 rounded-[0.3rem]"
                value="Cancelled"
              >
                Cancelled
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="items"
            className="font-medium text-xs md:text-sm select-none pointer-events-none"
          >
            Total Items
          </Label>
          <Input
            type="number"
            id="items"
            value={items.length}
            disabled
            onChange={(e) => {}}
            placeholder="Total items"
            className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm placeholder:text-neutral-500 w-full focus:border-neutral-600"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="amount"
            className="font-medium text-xs md:text-sm  select-none pointer-events-none"
          >
            Amount
          </Label>
          <Input
            type="number"
            value={amount}
            // onChange={(e) => updateAmount(e.target.value)}
            id="amount"
            disabled
            placeholder="Amount"
            className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm placeholder:text-neutral-500 w-full focus:border-neutral-600"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="method"
            className="font-medium text-xs md:text-sm select-none pointer-events-none"
          >
            Payment Method
          </Label>
          <Select onValueChange={(value) => updatePaymentMethod(value)}>
            <SelectTrigger className="w-full text-xs  md:text-sm border-neutra-200 rounded-[0.3rem] focus:border-neutral-600">
              <SelectValue placeholder={`${paymentMethod}`} />
            </SelectTrigger>
            <SelectContent className=" bg-white rounded-[0.3rem]">
              <SelectItem
                className="text-xs md:text-sm !cursor-pointer hover:!bg-neutral-100 rounded-[0.3rem]"
                value="CASH"
              >
                CASH
              </SelectItem>
              <SelectItem
                className="text-xs md:text-sm !cursor-pointer hover:!bg-neutral-100 rounded-[0.3rem]"
                value="MPESA"
              >
                MPESA
              </SelectItem>
              <SelectItem
                className="text-xs md:text-sm !cursor-pointer hover:!bg-neutral-100 rounded-[0.3rem]"
                value="ADEEGO WALLET"
              >
                ADEEGO WALLET
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="orderStatus"
            className="font-medium text-xs md:text-sm select-none pointer-events-none"
          >
            Payment Status
          </Label>
          <Select onValueChange={(value) => updatePaymentStatus(value)}>
            <SelectTrigger className="w-full text-xs md:text-sm border-neutra-200 rounded-[0.3rem] focus:border-neutral-600">
              <SelectValue placeholder={`${paymentStatus}`} />
            </SelectTrigger>
            <SelectContent className=" bg-white rounded-[0.3rem]">
              <SelectItem
                className="text-xs md:text-sm !cursor-pointer hover:!bg-neutral-100 rounded-[0.3rem]"
                value="Unpaid"
              >
                Unpaid
              </SelectItem>
              <SelectItem
                className="text-xs md:text-sm !cursor-pointer hover:!bg-neutral-100 rounded-[0.3rem]"
                value="Paid"
              >
                Paid
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </form>
      <hr className="my-6 border-neutral-100 md:border-neutral-200" />
      <div className="">
        <div className="grid w-full items-center gap-1.5 px-4 md:px-0">
          <Label className="text-xs md:text-sm select-none pointer-events-none">
            Available items
          </Label>
          <div className="flex flex-col gap-2 py-2 md:py-4">
            {items.map((item, i) => (
              <OrderItem removeItem={removeItem} key={i} item={item} />
            ))}
          </div>
        </div>
      </div>
      <hr className="my-6 border-neutral-100 md:border-neutral-200" />

      <hr className="my-6 border-neutral-100 md:border-neutral-200" />
      <div className="grid w-full items-center gap-1.5 pb-6">
        <Label
          htmlFor=""
          className="font-medium text-xs md:text-sm select-none pointer-events-none"
        >
          Add product
        </Label>
        <EditOrderProduct addItem={addItem} />
      </div>
    </>
  );
};

export default EditForm;
