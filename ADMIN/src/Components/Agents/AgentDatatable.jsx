"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "../Products/Pagination";
import { useState } from "react";
import ViewMenu from "./ViewMenu";

const AgentDataTable = ({ columns, data }) => {
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

  console.log(data)

  return (
    <section className="relative">
      <div className="w-full h-10 hidden md:flex justify-end absolute -top-14">
        <ViewMenu table={table} />
      </div>
      <div className="border border-neutral-300 rounded-[0.4rem]">
        <Table className="">
          <TableHeader className="">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="border-neutral-300" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={`text-neutral-500 text-xs md:text-sm text-left ${
                        header.id === "FullName" ||
                        header.id === "Code" ||
                        header.id === "Wallet" ||
                        header.id === "actions"
                          ? "visible"
                          : "invisible absolute z-[-1] md:visible md:relative md:z-0"
                      }`}
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
                      className={`text-xs md:text-sm ${
                        cell.column.id === "FullName" ||
                        cell.column.id === "Code" ||
                        cell.column.id === "Wallet" ||
                        cell.column.id === "actions"
                          ? "visible"
                          : "invisible absolute z-[-1] md:visible md:relative md:z-0"
                      }`}
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
};

export default AgentDataTable;
