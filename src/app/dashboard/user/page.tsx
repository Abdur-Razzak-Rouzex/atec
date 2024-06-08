 
import { columns } from "@/components/shared/table/columns";
import { DataTable } from "@/components/shared/table/data-table";
import { getUsers } from "@/data/fetchUsers";
import React from "react";

const  UserPage =async () => {
  const data = await getUsers();
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="my-5 text-2xl font-bold">All users</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default UserPage; 







