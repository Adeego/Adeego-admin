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
import OrdersViewMenu from "./OrdersViewMenu";

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
      <div className="w-full h-10 hidden md:flex justify-end absolute -top-14">
        <OrdersViewMenu table={table} />
      </div>
      <div className="border border-neutral-300 rounded-[0.4rem] w-full !overflow-hidden">
        <Table className="">
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="border-neutral-300 relative"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => {
                  console.log(header);
                  return (
                    <TableHead
                      key={header.id}
                      className={`text-neutral-500 text-xs md:text-sm text-left  ${
                        header.id === "Id" ||
                        header.id === "TotalAmount" ||
                        header.id === "actions"
                          ? "visible"
                          : "hidden md:table-cell"
                      }`}
                      //   className={`text-neutral-500 text-xs md:text-sm text-left ${
                      //     header.id === "Id" ||
                      //     header.id === "TotalAmount" ||
                      //     header.id === "actions"
                      //       ? "visible"
                      //       :  "invisible absolute z-[-1] md:visible md:relative md:z-0"
                      //     //   : "invisible absolute z-[-1] xl:visible xl:relative md:z-0"
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
                      className={`text-neutral-700 text-xs md:!text-sm text-left ${
                        cell.column.id === "Id" ||
                        cell.column.id === "TotalAmount" ||
                        cell.column.id === "actions"
                          ? "visible"
                          : "hidden md:table-cell"
                      }`}
                      //   className={`text-xs md:text-sm ${
                      //     cell.column.id === "Id" ||
                      //     cell.column.id === "TotalAmount" ||
                      //     cell.column.id === "actions"
                      //       ? "visible"
                      //       : "invisible absolute z-[-1] md:visible md:relative md:z-0"
                      //     //   : "invisible absolute z-[-1] xl:visible xl:relative md:z-0"
                      //   }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
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
