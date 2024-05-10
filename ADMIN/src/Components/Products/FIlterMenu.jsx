import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";

const FilterMenu = ({activeStatus}) => {
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
          onCheckedChange={() => {
            toggleActiveStatus("all");
          }}
        >
          <small className="text-xs">All items</small>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className='bg-white data-[state="checked"]:bg-neutral-100/60 rounded-[0.4rem]'
          checked={activeStatus === "in_stock"}
          onCheckedChange={() => {
            toggleActiveStatus("in_stock");
          }}
        >
          <small className="text-xs">In stock</small>
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          className='bg-white data-[state="checked"]:bg-neutral-100/60 rounded-[0.4rem]'
          checked={activeStatus === "no_stock"}
          onCheckedChange={() => {
            toggleActiveStatus("no_stock");
          }}
        >
          <small className="text-xs">Out of stock</small>
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterMenu;
