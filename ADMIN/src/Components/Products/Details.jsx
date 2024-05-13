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

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Fragment, useState } from "react";

import { Image } from "lucide-react";
import { formatPrice } from "../../lib/utils";

const DetailsBody = ({ product }) => {
  const price = formatPrice(product.Price);

  const category =
    product.Category === "DryFoods"
      ? "Dry Foods"
      : product.Category === "OilButter"
      ? "Oil & Butter"
      : product.Category === "OtherFoods"
      ? "Other Foods"
      : product.Category === "BabyCare"
      ? "Baby Care"
      : product.Category === "PersonalCare"
      ? "Personal Care"
      : product.Category === "Cleaning"
      ? "Cleaning"
      : product.Category === "OtherEssentials"
      ? "Other Essentials"
      : product.Category;

  return (
    <div className="px-4 flex flex-col gap-6 md:px-0 md:mt-4">
      <div className="flex flex-col gap-3">
        <div className="text-xs md:text-sm font-medium border border-green-300 bg-green-100 rounded-[0.3rem] max-w-fit p-1 px-2">
          {product.Stock === "In stock" ? (
            <p className="text-green-500">In stock</p>
          ) : (
            <p className="text-red-500">Out of Stock</p>
          )}
        </div>
        <p className="text-xs md:text-sm text-neutral-600 !leading-relaxed">
          Veniam quis qui tempor incididunt mollit nulla. Elit Lorem aute do
          esse proident eu cillum est ea consequat dolor.
        </p>
        <div className="font-semibold tracking-tight  text-neutral-600 md:text-lg">
          {price}
        </div>
      </div>
      <Separator
        orientation="horizontal"
        className="bg-neutral-100 md:bg-neutral-200"
      />
      <div className="text-xs md:text-sm">
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold">Product information</h1>
          <div className="w-full flex items-center justify-between">
            <div className="text-neutral-500">Product ID</div>
            <div className="text-black">{product.id}</div>
          </div>
          <div className="w-full flex items-center justify-between">
            <div className="text-neutral-500">Quantity</div>
            <div className="text-black">{product.Size}</div>
          </div>
        </div>
      </div>
      <Separator
        orientation="horizontal"
        className="bg-neutral-100 md:bg-neutral-200"
      />
      <div className="text-xs md:text-sm">
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold">Product Category</h1>
          <div className="w-full flex items-center justify-between">
            <div className="text-neutral-500">Category</div>
            <div className="text-black capitalize">{category}</div>
          </div>
        </div>
      </div>
      <Separator
        orientation="horizontal"
        className="bg-neutral-100 md:bg-neutral-200"
      />
      <div className="text-xs md:text-sm">
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold">Product Keywords</h1>
          <div className="flex flex-wrap gap-2 items-center text-neutral-500">
            {[...Array(5)].map((_, i) => (
              <Fragment>
                <div>Keyword</div>
                {/* {i !== product.Keywords.length - 1 && (
                  <div className="h-[2px] aspect-square rounded-full bg-neutral-900"></div>
                )} */}
                {i !== 4 && (
                  <div className="h-[2px] aspect-square rounded-full bg-neutral-900"></div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="text-xs pt-5">
        <div className="text-neutral-500 text-xs">
          Added on January 20, 2024
        </div>
      </div>
    </div>
  );
};

const DetailsMobileComp = ({ product }) => {
  console.log(product);
  const [hasImageLoaded, setImageHasLoaded] = useState(false);
  return (
    <div className="md:hidden">
      <Drawer>
        <DrawerTrigger className="w-full">
          <button className="gap-2 items-center text-xs md:text-sm hover:!bg-neutral-200/60 transition !cursor-pointer  rounded-[0.3rem] w-full text-left ">
            More details
          </button>
        </DrawerTrigger>
        <DrawerContent className="bg-white pb-4">
          <ScrollArea className="h-[80vh] ">
            <DrawerHeader className="text-left flex flex-col gap-6">
              <div className="w-full aspect-square bg-white rounded-[0.4rem] overflow-hidden relative">
                <img
                  src={product.Image}
                  onLoad={() => setImageHasLoaded(true)}
                  className={`${
                    hasImageLoaded ? "block" : "hidden"
                  } w-full h-full object-cover`}
                  alt={product.Name}
                />
                <Skeleton
                  className={`absolute w-full h-full top-0 left-0 grid place-items-center bg-neutral-300 ${
                    hasImageLoaded && "hidden"
                  }`}
                >
                  <Image
                    size={28}
                    className="stroke-neutral-400"
                    stroke-width={3}
                  />
                </Skeleton>
              </div>
              <DrawerTitle className="">
                {product ? (
                  product.Name
                ) : (
                  <Skeleton className="w-1/4 h-5 bg-neutral-200 rounded-[0.3rem]" />
                )}
              </DrawerTitle>
            </DrawerHeader>
            <DetailsBody product={product} />
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

const DetailsLgComp = ({ product }) => {
  const [hasImageLoaded, setImageHasLoaded] = useState(false);

  return (
    <div className="hidden md:block">
      <Sheet>
        <SheetTrigger className="w-full">
          <button className="gap-2 items-center text-xs md:text-sm hover:!bg-neutral-200/60 transition !cursor-pointer  rounded-[0.3rem] w-full text-left ">
            More details
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="bg-white w-full sm:max-w-lg flex flex-col gap-12 text-sm pt-10"
        >
          <ScrollArea className="h-full flex flex-col">
            <SheetHeader className="text-left flex flex-col gap-4">
              <div className="w-full aspect-square bg-neutral-300 rounded-[0.4rem] overflow-hidden relative">
                <img
                  src={product.Image}
                  onLoad={() => setImageHasLoaded(true)}
                  className={`${
                    hasImageLoaded ? "block" : "hidden"
                  } w-full h-full object-cover absolute`}
                  alt={product.Name}
                />
                <Skeleton
                  className={`w-full h-full grid place-items-center bg-neutral-300 ${
                    hasImageLoaded && "hidden"
                  }`}
                />
              </div>
              <SheetTitle className="tracking-tight">
                {product ? (
                  product.Name
                ) : (
                  <Skeleton className="w-1/4 h-5 bg-neutral-200 rounded-[0.3rem]" />
                )}{" "}
              </SheetTitle>
            </SheetHeader>
            <DetailsBody product={product} />
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};

const DetailsComp = ({ product }) => {
  return (
    <>
      <DetailsMobileComp product={product} />
      <DetailsLgComp product={product} />
    </>
  );
};

export default DetailsComp;
