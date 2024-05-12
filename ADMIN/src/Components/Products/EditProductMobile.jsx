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

import { ScrollArea } from "@/components/ui/scroll-area";
import EditForm from "./EditForm";
const EditProductMobile = ({ product }) => {
  return (
    <div className="md:hidden">
      <Drawer>
        <DrawerTrigger className="w-full">
          <button className="gap-2 items-center text-xs md:text-sm hover:!bg-neutral-200/60 transition !cursor-pointer p-1.5 px-2 rounded-[0.3rem] w-full text-left">
            Edit product
          </button>
        </DrawerTrigger>
        <DrawerContent className="bg-white">
          <ScrollArea className="h-[85vh]">
            <DrawerHeader className="text-left">
              <DrawerTitle>Edit Product</DrawerTitle>
              <DrawerDescription className="text-xs text-neutral-500">
                Make changes to your product here. Click save when you're done.
              </DrawerDescription>
            </DrawerHeader>
            <EditForm product={product} />
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
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default EditProductMobile;
