import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
  } from "@/components/ui/dropdown-menu";
  import { ChevronDown, SlidersHorizontal } from "lucide-react";
  
  const ViewMenu = ({ table }) => {
    return (
      <DropdownMenu className=" bg-red-200">
        <DropdownMenuTrigger className="outline-none">
          <button className="w-10 md:w-auto h-10 rounded-[0.4rem] border border-neutral-200 md:border-neutral-300 hover:border-neutral-500 grid place-items-center bg-white text-black md:flex gap-2 md:px-4 ">
            <span className="hidden md:block text-xs font-medium select-none pointer-events-none">
              Columns
            </span>
            <ChevronDown className="h-[15px] w-[15px]  select-none pointer-events-none" />
          </button>
        </DropdownMenuTrigger>
  
        <DropdownMenuContent className="bg-white  border-neutral-100 md:border-neutral-300 rounded-[0.4rem] mr-4 w-32 md:w-36 md:p-2 flex flex-col gap-1">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              const columnName =
                column.id === "Fullname"
                  ? "Name"
                  : column.id === "AddressId"
                  ? "Address Id"
                  : column.id === "CartId"
                  ? "Cart Id"
                  : column.id;
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className={`bg-white hover:!bg-neutral-200/60 transition rounded-[0.4rem] capitalize ${
                    column.id === "actions" && "hidden"
                  }`}
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {columnName}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };
  
  export default ViewMenu;
  