import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const EditForm = ({ customer, editCustomerFxns }) => {
  const {
    userId,
    firstName,
    lastName,
    phone,
    verified,
    addressId,
    cartId,
    tier,
    referredBy,
  } = customer;

  const {
    updateUserId,
    updateFirstName,
    updateLastName,
    updatePhone,
    updateVerified,
    updateAddressId,
    updateCartId,
    updateTier,
    updateReferredBy,
  } = editCustomerFxns;

  return (
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
          htmlFor="firstname"
          className="font-medium text-xs md:text-sm select-none pointer-events-none"
        >
          First Name
        </Label>
        <Input
          type="text"
          id="firstName"
          value={firstName}
          placeholder="First Name"
          onChange={(e) => updateFirstName(e.target.value)}
          className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label
          htmlFor="lastName"
          className="font-medium text-xs md:text-sm select-none pointer-events-none"
        >
          Last Name
        </Label>
        <Input
          type="text"
          id="userId"
          value={lastName}
          placeholder="Last Name"
          onChange={(e) => updateLastName(e.target.value)}
          className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label
          htmlFor="phone"
          className="font-medium text-xs md:text-sm select-none pointer-events-none"
        >
          Phone{" "}
        </Label>
        <Input
          type="number"
          id="phone"
          value={phone}
          placeholder="Phone"
          onChange={(e) => updatePhone(e.target.value)}
          className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label
          htmlFor="agent code"
          className="font-medium text-xs md:text-sm select-none pointer-events-none"
        >
          Agent Code
        </Label>
        <Input
          type="text"
          id="agent code"
          value={referredBy}
          placeholder="Phone"
          onChange={(e) => updateReferredBy(e.target.value)}
          className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label
          htmlFor="verified"
          className="font-medium text-xs md:text-sm select-none pointer-events-none"
        >
          Verified
        </Label>
        <Select onValueChange={(value) => updateVerified(value)}>
          <SelectTrigger className="w-full text-xs  md:text-sm border-neutra-200 rounded-[0.3rem] focus:border-neutral-600">
            <SelectValue placeholder={`${verified}`} />
          </SelectTrigger>
          <SelectContent className=" bg-white rounded-[0.3rem]">
            <SelectItem
              className="text-xs md:text-sm !cursor-pointer hover:!bg-neutral-100 rounded-[0.3rem]"
              value={"true"}
            >
              True
            </SelectItem>
            <SelectItem
              className="text-xs md:text-sm !cursor-pointer hover:!bg-neutral-100 rounded-[0.3rem]"
              value={"false"}
            >
              False{" "}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label
          htmlFor="tier"
          className="font-medium text-xs md:text-sm select-none pointer-events-none"
        >
          Tier
        </Label>
        <Select onValueChange={(value) => updateTier(value)}>
          <SelectTrigger className="w-full text-xs  md:text-sm border-neutra-200 rounded-[0.3rem] focus:border-neutral-600">
            <SelectValue placeholder={`${tier}`} />
          </SelectTrigger>
          <SelectContent className=" bg-white rounded-[0.3rem]">
            <SelectItem
              className="text-xs md:text-sm !cursor-pointer hover:!bg-neutral-100 rounded-[0.3rem]"
              value="New"
            >
              New
            </SelectItem>
            <SelectItem
              className="text-xs md:text-sm !cursor-pointer hover:!bg-neutral-100 rounded-[0.3rem]"
              value="Bronze"
            >
              Bronze
            </SelectItem>
            <SelectItem
              className="text-xs md:text-sm !cursor-pointer hover:!bg-neutral-100 rounded-[0.3rem]"
              value="Silver"
            >
              Silver
            </SelectItem>
            <SelectItem
              className="text-xs md:text-sm !cursor-pointer hover:!bg-neutral-100 rounded-[0.3rem]"
              value="Gold"
            >
              Gold
            </SelectItem>
            <SelectItem
              className="text-xs md:text-sm !cursor-pointer hover:!bg-neutral-100 rounded-[0.3rem]"
              value="Platinum"
            >
              Platinum
            </SelectItem>
            <SelectItem
              className="text-xs md:text-sm !cursor-pointer hover:!bg-neutral-100 rounded-[0.3rem]"
              value="Diamond"
            >
              Diamond
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label
          htmlFor="addressId"
          className="font-medium text-xs md:text-sm select-none pointer-events-none"
        >
          Address Id
        </Label>
        <Input
          type="text"
          id="addressId"
          value={addressId}
          onChange={(e) => updateAddressId(e.target.value)}
          placeholder="Address Id"
          className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm placeholder:text-neutral-500 w-full focus:border-neutral-600"
        />
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label
          htmlFor="cartId"
          className="font-medium text-xs md:text-sm select-none pointer-events-none"
        >
          Card Id
        </Label>
        <Input
          type="text"
          id="cartId"
          value={cartId}
          onChange={(e) => updateCartId(e.target.value)}
          placeholder="Cart Id"
          className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm placeholder:text-neutral-500 w-full focus:border-neutral-600"
        />
      </div>
    </form>
  );
};

export default EditForm;
