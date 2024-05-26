"use client";

import { ArrowUpDown, MoreHorizontal, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { 
  ColumnDef, 
  flexRender,
  SortingState, 
  getCoreRowModel,
  
} from "@tanstack/react-table";
import { date } from "zod";
import { Checkbox } from "@chakra-ui/react";
export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  lastSeen: string;
};



export const columns: ColumnDef<User>[] = [

  /* {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)
 
      return <div className="text-right font-medium">{formatted}</div>
    },
  }, */


  {
    accessorKey: "name",
    header: ({column}) => {
      <Checkbox

    />
      return(
        <Button variant='ghost'
        onClick={()=> column.toggleSorting(column.getIsSorted() === 'asc')}
        >
Name
<ArrowUpDown />
        </Button>
      )
    }
  },

  {
    accessorKey: "email",
    header: "Email",
  },

  {
    accessorKey: "lastSeen",
    header: "Last Seen",

    cell: ({ row }) => {
      const date = new Date(row.getValue("lastSeen"));
      const formatted = date.toLocaleDateString();
      return <div className="font-medium">{formatted}</div>;
    },
  },

  {
    id: "action",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Action</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
