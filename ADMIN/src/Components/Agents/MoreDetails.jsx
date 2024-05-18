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
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import { convertFirestoreTimestampToDate, formatPrice } from "../../lib/utils";
import { Timestamp } from "firebase/firestore";

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

const DetailsBody = ({ agent }) => {
  const formattedDate = convertFirestoreTimestampToDate(agent.Joined);
  const lastUpdated = agent.Joined ? convertFirestoreTimestampToDate(agent.Updated)
    : formattedDate;
    console.log(agent)
  return (
    <>
      <div className="flex flex-col gap-6 text-xs md:text-sm">
        {/* customer info */}
        {agent ? (
          <div className="flex flex-col gap-3">
            <h1 className="font-semibold">Personal information</h1>
            <div className="w-full flex items-center justify-between">
              <div className="text-neutral-500">Agent name</div>
              <div className="text-black capitalize">{agent.FullName}</div>
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="text-neutral-500">Agent ID</div>
              <div className="text-black">{agent.id}</div>
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="text-neutral-500">Phone Number</div>
              <div className="text-black">{agent.Phone}</div>
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="text-neutral-500">Agent Code</div>
              <div className="text-black">{agent.Code}</div>
            </div>
          </div>
        ) : (
          <SkeletonComp />
        )}
        <Separator orientation="horizontal" className="bg-neutral-200" />
        {/* address info */}
        {agent ? (
          <div className="flex flex-col gap-3">
            <h1 className="font-semibold">Address information</h1>
            <div className="w-full flex items-center justify-between">
              <div className="text-neutral-500">Area of residence</div>
              <div className="text-black">{agent.Address}</div>
            </div>
          </div>
        ) : (
          <SkeletonComp />
        )}
        <Separator orientation="horizontal" className="bg-neutral-200" />
        {/* payement info */}
        {agent ? (
          <div className="flex flex-col gap-3">
            <h1 className="font-semibold">Payment information</h1>
            <div className="w-full flex items-center justify-between">
              <div className="text-neutral-500">Wallet</div>
              <div className="text-black">{formatPrice(agent.Wallet)}</div>
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="text-neutral-500">Referred Clients</div>
              <div className="text-black">{agent.Referred}</div>
            </div>
          </div>
        ) : (
          <SkeletonComp />
        )}{" "}
        <Separator orientation="horizontal" className="bg-neutral-200" />
        {agent ? (
          <div className="flex flex-col gap-3">
            <h1 className="font-semibold">Registration information</h1>
            <div className="w-full flex items-center justify-between">
              <div className="text-neutral-500">Date of Registration</div>
              <div className="text-black">{formattedDate}</div>
            </div>
          </div>
        ) : (
          <SkeletonComp />
        )}
      </div>
      <div className="mt-10 pb-3">
        <small className="text-neutral-600 text-xs md:text-md">
          Updated on {lastUpdated}
        </small>
      </div>
    </>
  );
};

const MoreDetailsMobile = ({ agent }) => {
  return (
    <div className="md:hidden">
      <Drawer>
        <DrawerTrigger className="w-full">
          <button className="gap-2 text-left items-center text-xs md:text-sm  rounded-[0.4rem] !cursor-pointer hover:!bg-neutral-200 w-full h-full transition-all px-2 py-1.5">
            More details
          </button>
        </DrawerTrigger>
        <DrawerContent className="bg-white pb-10">
          <ScrollArea className="">
            <DrawerHeader className="text-left flex flex-col gap-2 mb-6">
              <DrawerTitle className="tracking-tight">
                {agent.FullName}
              </DrawerTitle>
            </DrawerHeader>
            <div className="px-4">
              <DetailsBody agent={agent} />
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

const MoreDetailsLg = ({ agent }) => {
  return (
    <div className="hidden md:block ">
      <Sheet>
        <SheetTrigger className="w-full">
          <button className="gap-2 text-left items-center text-xs md:text-sm  rounded-[0.4rem] !cursor-pointer hover:!bg-neutral-200 w-full h-full transition-all px-2 py-1.5">
            More details
          </button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="bg-white w-full sm:max-w-lg flex flex-col gap-12 text-sm md:text- py-16"
        >
          <SheetHeader>
            <SheetTitle className="tracking-tight">{agent.FullName}</SheetTitle>
          </SheetHeader>
          <DetailsBody agent={agent} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

const MoreDetailsComp = ({ agent }) => {
  return (
    <>
      <MoreDetailsMobile agent={agent} />
      <MoreDetailsLg agent={agent} />
    </>
  );
};

export default MoreDetailsComp;
