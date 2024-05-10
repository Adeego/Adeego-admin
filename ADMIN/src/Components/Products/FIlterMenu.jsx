import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";

const FilterMenu = ({ activeStatus, toggleActiveStatus, resetFilter }) => {
  return (
    <DropdownMenu className=" bg-red-200">
      <DropdownMenuTrigger className="outline-none">
        <Button
          variant="outline"
          size="icon"
          className="rounded-[0.3rem] border-neutral-200/60 text-neutral-500"
        >
          <ListFilter size={15} strokeWidth={2} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white  border-neutral-100 rounded-[0.4rem] mr-14 w-32">
        <DropdownMenuCheckboxItem
          className='bg-white data-[state="checked"]:bg-neutral-100/60 rounded-[0.4rem]'
          checked={activeStatus === "all"}
          onCheckedChange={resetFilter}
        >
          <small className="text-xs">All items</small>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className='bg-white data-[state="checked"]:bg-neutral-100/60 rounded-[0.4rem]'
          checked={activeStatus === "In stock"}
          onCheckedChange={() => {
            toggleActiveStatus("In stock");
          }}
        >
          <small className="text-xs">In stock</small>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className='bg-white data-[state="checked"]:bg-neutral-100/60 rounded-[0.4rem]'
          checked={activeStatus === "Out of stock"}
          onCheckedChange={() => {
            toggleActiveStatus("Out of stock");
          }}
        >
          <small className="text-xs">Out of stock</small>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterMenu;
