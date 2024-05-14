import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

export function DataTablePagination({ table }) {
  return (
    <div className="flex items-center w-full max-w-lg ml-auto">
      <div className="flex-1 text-sm text-muted-foreground hidden">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center px-2 justify-between w-full">
        <div className="md:flex items-center space-x-2">
          {/* <p className="text-sm font-medium">Rows per page</p> */}
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 md:h-10 w-[80px] md:w-[100px] rounded-[0.3rem] border border-neutral-400 text-xs md:text-sm p-2">
              <SelectValue placeholder={`${table.getState().pagination.pageSize}`} />
            </SelectTrigger>
            <SelectContent side="top" className='bg-white rounded-[0.3rem]'>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`} className=''>
                {pageSize} rows
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center text-xs md:text-sm text-neutral-500 font-medium">
           Page{" "}
          <span className="text-black mx-1">
            {table.getState().pagination.pageIndex + 1}
          </span>{" "}
          of
          <span className="text-black mx-1">{table.getPageCount()}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className=" h-8 w-8 md:h-10 md:w-10 p-0 lg:flex  disabled:border-neutral-300 disabled:text-neutral-500 rounded-[0.3rem] hidden"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 md:h-10 md:w-10 p-0 flex border  disabled:border-neutral-300 disabled:text-neutral-500 rounded-[0.3rem]"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 md:h-10 md:w-10 p-0 border  disabled:border-neutral-300 disabled:text-neutral-500 rounded-[0.3rem]"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className=" h-8 w-8 md:h-10 md:w-10 p-0 lg:flex   disabled:border-neutral-300 disabled:text-neutral-500 rounded-[0.3rem] hidden"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
