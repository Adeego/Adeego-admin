import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { ListFilter } from "lucide-react";

const OrderFilterMenu = ({ activeStatus, toggleActiveStatus, resetFilter }) => {
  return (
    <DropdownMenu className=" bg-red-200">
      <DropdownMenuTrigger className="outline-none">
        <button className="w-10 md:w-auto h-10 rounded-[0.4rem] border border-neutral-200 md:border-neutral-300 hover:border-neutral-500 grid place-items-center bg-white text-black md:flex gap-2 md:px-4 ">
          <ListFilter className="h-[15px] w-[15px]  select-none pointer-events-none" />
          <span className="hidden md:block text-xs font-medium select-none pointer-events-none">
            Filter{" "}
          </span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white  border-neutral-100 md:border-neutral-300 rounded-[0.4rem] mr-14 w-32 md:w-36 md:p-2 flex flex-col gap-1">
        <DropdownMenuCheckboxItem
          className='bg-white data-[state="checked"]:bg-neutral-100/60 data-[state="checked"]:md:bg-neutral-200/60 hover:bg-neutral-200/60 transition rounded-[0.4rem]'
          checked={activeStatus === "" || activeStatus === "all"}
          onCheckedChange={resetFilter}
        >
          <small className="text-xs md:text-sm">All orders</small>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className='bg-white data-[state="checked"]:bg-neutral-100/60 data-[state="checked"]:md:bg-neutral-200/60 hover:bg-neutral-100 transition rounded-[0.4rem]'
          checked={activeStatus === "Pending"}
          onCheckedChange={() => {
            toggleActiveStatus("Pending");
          }}
        >
          <small className="text-xs md:text-sm">Pending</small>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className='bg-white data-[state="checked"]:bg-neutral-100/60 data-[state="checked"]:md:bg-neutral-200/60 hover:bg-neutral-100 transition rounded-[0.4rem]'
          checked={activeStatus === "Completed"}
          onCheckedChange={() => {
            toggleActiveStatus("Completed");
          }}
        >
          <small className="text-xs md:text-sm">Completed</small>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderFilterMenu;
