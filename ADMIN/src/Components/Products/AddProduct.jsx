import React, { useState } from "react";
import app from "../../../firebaseConfig";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

import { CirclePlus } from "lucide-react";

function AddProduct() {
  // State variables for adding new product

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [size, setSize] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState([]);

  const categoryOptions = [
    { value: "DryFoods", label: "Dry Foods" },
    { value: "OilButter", label: "Oil & Butter" },
    { value: "OtherFoods", label: "Other Foods" },
    { value: "BabyCare", label: "Baby Care" },
    { value: "PersonalCare", label: "Personal Care" },
    { value: "Cleaning", label: "Cleaning" },
    { value: "OtherEssentials", label: "Other Essentials" },
  ];

  const stockOptions = [
    { stock: "" },
    { stock: "In stock" },
    { stock: "Out of stock" },
  ];

  const handleName = (value) => {
    setName(value);
  };

  const handleCategory = (value) => {
    setCategory(value);
  };

  const handleStock = (value) => {
    setStock(value);
  };

  const handleSize = (value) => {
    setSize(value);
  };

  const handleBuyPrice = (value) => {
    setBuyPrice(value);
  };

  const handlePrice = (value) => {
    setPrice(value);
  };

  const handleImage = (value) => {
    setImage(value);
  };

  const handleDescription = (value) => {
    setDescription(value);
  };

  const handleKeywords = (value) => {
    setKeywords(value);
  };

  // Clear input fields
  const clearInputFields = () => {
    setName("");
    setCategory("");
    setStock("");
    setSize("");
    setBuyPrice("");
    setPrice("");
    setImage("");
    setDescription("");
    setKeywords([]);
  };

  // Add new product
  const addNewProduct = async () => {
    try {
      const db = getFirestore(app);
      const productRef = collection(db, "Products");
      const productData = {
        Name: name,
        Category: category,
        Stock: stock,
        Size: size,
        BuyPrice: parseFloat(buyPrice),
        Price: parseFloat(price),
        Image: image,
        Description: description,
        Keywords: keywords,
        CreatedAt: serverTimestamp(),
        UpdatedAt: serverTimestamp(),
      };

      const newProductRef = await addDoc(productRef, productData);

      clearInputFields();

      return newProductRef.id;
    } catch (error) {
      console.error(error);
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
              Add Product
            </span>
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white !rounded-[0.5rem] w-[95%]">
          <ScrollArea className="max-h-[90vh]">
            <AlertDialogHeader>
              <AlertDialogTitle>Add product</AlertDialogTitle>
              <AlertDialogDescription>
                Add a new product and click continue when you're done.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <form action="" className=" flex flex-col gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label
                  htmlFor="userId"
                  className="font-medium text-xs md:text-sm select-none pointer-events-none"
                >
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => handleName(e.target.value)}
                  placeholder="Name"
                  className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label
                  htmlFor="image"
                  className="font-medium text-xs md:text-sm select-none pointer-events-none"
                >
                  Image url <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="url"
                  value={image}
                  onChange={(e) => handleImage(e.target.value)}
                  placeholder="Image"
                  className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label
                  htmlFor="description"
                  className="font-medium text-xs md:text-sm select-none pointer-events-none"
                >
                  Description
                </Label>
                <Textarea
                  id="name"
                  value={description}
                  onChange={(e) => {
                    handleDescription(e.target.value);
                  }}
                  placeholder="Description"
                  className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label
                  htmlFor="orderStatus"
                  className="font-medium text-xs md:text-sm select-none pointer-events-none"
                >
                  Category
                </Label>
                <Select onValueChange={(value) => handleCategory(value)}>
                  <SelectTrigger className="w-full text-xs  md:text-sm border-neutra-200 rounded-[0.3rem] focus:border-neutral-600">
                    <SelectValue placeholder={`category`} />
                  </SelectTrigger>
                  <SelectContent className=" bg-white rounded-[0.3rem]">
                    {categoryOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        className="text-xs md:text-sm !cursor-pointer hover:!bg-neutral-100 rounded-[0.3rem]"
                        value={option.value}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label className="font-medium text-xs md:text-sm select-none pointer-events-none">
                  Availability
                </Label>
                <Select onValueChange={(value) => handleStock(value)}>
                  <SelectTrigger className="w-full text-xs  md:text-sm border-neutra-200 rounded-[0.3rem] focus:border-neutral-600">
                    <SelectValue placeholder={`In stock`} />
                  </SelectTrigger>
                  <SelectContent
                    onChange={(e) => handleStock(e.target.value)}
                    className=" bg-white rounded-[0.3rem]"
                  >
                    <SelectItem
                      className="text-xs md:text-sm !cursor-pointer hover:!bg-neutral-100 rounded-[0.3rem]"
                      value="In stock"
                    >
                      In stock
                    </SelectItem>
                    <SelectItem
                      className="text-xs md:text-sm !cursor-pointer hover:!bg-neutral-100 rounded-[0.3rem]"
                      value="Out of stock"
                    >
                      Out of stock{" "}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label
                  htmlFor="b_price"
                  className="font-medium text-xs md:text-sm select-none pointer-events-none"
                >
                  Buying price <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="number"
                  id="b_price"
                  value={buyPrice}
                  onChange={(e) => {
                    handleBuyPrice(e.target.value);
                  }}
                  placeholder="Buying Price"
                  className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label
                  htmlFor="price"
                  className="font-medium text-xs md:text-sm select-none pointer-events-none"
                >
                  Price <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => {
                    handlePrice(e.target.value);
                  }}
                  placeholder="Price"
                  className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label
                  htmlFor="price"
                  className="font-medium text-xs md:text-sm select-none pointer-events-none"
                >
                  Quantity <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="size"
                  value={size}
                  onChange={(e) => {
                    handleSize(e.target.value);
                  }}
                  placeholder="Quantity"
                  className="border-neutral-200 rounded-[0.4rem] text-xs md:text-sm focus:border-neutral-600 placeholder:text-neutral-500 w-full"
                />
              </div>
            </form>

            <AlertDialogFooter className="mt-4">
              <AlertDialogCancel className="border border-neutral-300 rounded-[0.3rem] px-6">
                Cancel
              </AlertDialogCancel>
              <AlertDialogCancel
                onClick={(e) => {
                  e.preventDefault();
                  addNewProduct();
                }}
                className="bg-black text-white rounded-[0.3rem] text-sm font-medium p-2 px-6"
              >
                Continue
              </AlertDialogCancel>
            </AlertDialogFooter>
          </ScrollArea>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default AddProduct;
