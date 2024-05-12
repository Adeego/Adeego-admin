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

const OrderItem = ({ item }) => {
  const [hasImageLoaded, setImageLoaded] = useState(true);
  return (
    <div className="relative flex gap-2 p-2 border rounded-[0.3rem]">
      <div className="">
        <div className="h-10 rounded-[0.3rem] overflow-hidden aspect-square relative">
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
        <p className="text-xs font-medium text-neutral-800">{item.Name}</p>
        <div>
          <p className="text-xs text-neutral-500">
            Quantity : <span>{item.Quantity}</span>{" "}
          </p>
        </div>
      </div>

      {/* button */}
      <button className="h-5 aspect-square bg-black rounded-full grid place-items-center absolute top-1 right-1 text-white">
        <X size={12} />
      </button>
    </div>
  );
};

const EditForm = ({ order }) => {
  const { userId, status, totalItems, totalAmount, paymentStatus, items } =
    order;
  return (
    <>
      <form action="" className="p-2 px-4 flex flex-col gap-4">
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="userId"
            className="text-xs text-neutral-700 font-normal md:text-sm select-none pointer-events-none"
          >
            User ID
          </Label>
          <Input
            type="text"
            id="userId"
            value={userId}
            placeholder="User Id"
            className="border-neutral-200 rounded-[0.4rem] text-xs placeholder:text-neutral-500 w-full"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="orderStatus"
            className="text-xs text-neutral-700 font-normal md:text-sm select-none pointer-events-none"
          >
            Delivery Status
          </Label>
          <Select>
            <SelectTrigger className="w-full text-neutral-700 text-xs border-neutra-200 rounded-[0.3rem]">
              <SelectValue placeholder={`${status}`} />
            </SelectTrigger>
            <SelectContent className=" bg-white rounded-[0.3rem]">
              <SelectItem className="text-xs" value="pending">
                Pending
              </SelectItem>
              <SelectItem className="text-xs" value="processin">
                Processing
              </SelectItem>
              <SelectItem className="text-xs" value="out_for_delivery">
                Out for delivery
              </SelectItem>
              <SelectItem className="text-xs" value="delivered">
                Delivered
              </SelectItem>
              <SelectItem className="text-xs" value="cancelled">
                Cancelled
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="items"
            className="text-xs text-neutral-700 font-normal md:text-sm select-none pointer-events-none"
          >
            Total Items
          </Label>
          <Input
            type="number"
            id="items"
            value={totalItems}
            placeholder="Total items"
            className="border-neutral-200 rounded-[0.4rem] text-xs placeholder:text-neutral-500 w-full"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="amount"
            className="text-xs text-neutral-700 font-normal md:text-sm select-none pointer-events-none"
          >
            Amount
          </Label>
          <Input
            type="number"
            value={totalAmount}
            id="amount"
            placeholder="Amount"
            className="border-neutral-200 rounded-[0.4rem] text-xs placeholder:text-neutral-500 w-full"
          />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label
            htmlFor="orderStatus"
            className="text-xs text-neutral-700 font-normal md:text-sm select-none pointer-events-none"
          >
            Payment Status
          </Label>
          <Select>
            <SelectTrigger className="w-full text-neutral-700 text-xs border-neutra-200 rounded-[0.3rem]">
              <SelectValue placeholder={`${paymentStatus}`} />
            </SelectTrigger>
            <SelectContent className=" bg-white rounded-[0.3rem]">
              <SelectItem className="text-xs" value="Unpaid">
                Unpaid
              </SelectItem>
              <SelectItem className="text-xs" value="Paid">
                Paid
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </form>
      <hr className="my-6 border-neutral-100" />
      <div className="">
        <div className="grid w-full items-center gap-1.5 px-4">
          <Label className="text-xs text-neutral-700 font-normal md:text-sm select-none pointer-events-none">
            Available items
          </Label>
          <div className="flex flex-col gap-2">
            {items.map((item, i) => (
              <OrderItem key={i} item={item} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditForm;
