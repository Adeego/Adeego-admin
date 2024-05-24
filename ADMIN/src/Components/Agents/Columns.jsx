import { formatPrice } from "../../lib/utils";
import AgentsActionMenu from "./ActionsMenu";

export const columns = [
  {
    accessorKey: "id",
    header: () => <div className="text-left">Agent ID</div>,
  },
  {
    accessorKey: "FullName",
    header: () => <div className="text-left">Name</div>,
  },
  ,
  {
    accessorKey: "Phone",
    header: () => <div className="text-left">Phone</div>,
  },
  {
    accessorKey: "Code",
    header: () => <div className="text-left">Code</div>,
  },
  {
    accessorKey: "Address",
    header: () => <div className="text-left">Address</div>,
  },
  {
    accessorKey: "Occupation",
    header: () => <div className="text-left">Occupation</div>,
  },
  {
    accessorKey: "Referred",
    header: () => <div className="text-left">Refered Clients</div>,
  },
  {
    accessorKey: "Wallet",
    header: () => <div className="text-left">Wallet</div>,
    cell: ({ row }) => {
      const amount = formatPrice(row.original.Wallet);
      return <div className="text-left">{amount}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: () => <div className="text-left"></div>,
    cell: ({ row }) => {
      const agent = row.original;
      return <AgentsActionMenu agent={agent} />;
    },
  },
];
