"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { DataTablePagination } from "../Products/Pagination";

export function OrdersDataTable({ columns, data }) {
  // column visibilty;
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      columnVisibility,
    },
  });

  return (
    <section className="relative">
      <div className="border border-neutral-300 rounded-[0.4rem]">
        <Table className="">
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="border-neutral-300" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      //   className={`text-neutral-500 text-xs md:text-sm text-left ${
                      //     header.id === "Id" ||
                      //     header.id === "OrderStatus" ||
                      //     header.id === "TotalItems" ||
                      //     header.id === "TotalAmount" ||
                      //     header.id === "actions"
                      //       ? "visible"
                      //       : header.id !== "BuyPrice"
                      //       ? "invisible absolute z-[-1] md:visible md:relative md:z-0"
                      //       : "invisible absolute z-[-1] xl:visible xl:relative md:z-0"
                      //   }`}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={`border-neutral-200 ${row.column} ${
                    row.id % 2 == 0 && ""
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      //   className={`text-xs md:text-sm ${
                      //     cell.column.id === "Id" ||
                      //     cell.column.id === "OrderStatus" ||
                      //     cell.column.id === "TotalItems" ||
                      //     cell.column.id === "TotalAmount" ||
                      //     cell.column.id === "actions"
                      //       ? "visible"
                      //       : cell.column.id !== "BuyPrice"
                      //       ? "invisible absolute z-[-1] md:visible md:relative md:z-0"
                      //       : "invisible absolute z-[-1] xl:visible xl:relative md:z-0"
                      //   }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                      {/* {cell.column.id} */}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                ></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="relative h-20 flex items-center w-full">
        <DataTablePagination table={table} />
      </div>
    </section>
  );
}
