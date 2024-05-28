"use client";

import { convertFirestoreTimestampToDate } from "../../lib/utils";
import ActionsMenu from "./ActionsMenu";

export const columns = [
  {
    accessorKey: "id",
    header: () => <div className="text-left text-xs md:text-sm">User ID</div>,
  },
  {
    accessorKey: "Fullname",
    header: () => <div className="text-left">Name</div>,
    cell: ({ row }) => {
      const name = row.original.FirstName + " " + row.original.LastName;
      return <div className="text-xs md:text-sm">{name}</div>;
    },
  },
  {
    accessorKey: "CreatedAt",
    header: () => <div className="text-left">Joined on</div>,
    cell: ({ row }) => {
      const date =
        convertFirestoreTimestampToDate(row.original.CreatedAt) || "-";
      return <p className="text-xs md:text-sm">{date}</p>;
    },
  },
  {
    accessorKey: "ReferredBy",
    header: () => (
      <div className="text-left text-xs md:text-sm">Referred By</div>
    ),
  },
  {
    accessorKey: "Tier",
    header: () => <div className="text-left text-xs md:text-sm">Tier</div>,
  },
  {
    accessorKey: "Phone",
    header: () => <div className="text-left text-xs md:text-sm">Phone</div>,
  },
  {
    accessorKey: "Verified",
    header: () => <div className="text-left text-xs md:text-sm">Verified</div>,
  },
  {
    accessorKey: "AddressId",
    header: () => <div className="text-left text-xs md:text-sm">Address Id</div>,
  },
  {
    accessorKey: "CartId",
    header: () => <div className="text-left text-xs md:text-sm">Cart Id</div>,
  },
  {
    id: "actions",
    cell: ({ row, props }) => {
      const customer = row.original;

      return <ActionsMenu customer={customer} />;
    },
  },
];
