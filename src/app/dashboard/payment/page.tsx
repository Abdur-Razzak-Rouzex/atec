import { columns } from "@/components/shared/table/columns";
import { DataTable } from "@/components/shared/table/data-table";
import { payments } from "@/data/payment";
import React from "react";

const PaymentPage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="my-5 text-2xl font-bold">Payments</h1>
      <DataTable columns={columns} data={payments} />
    </div>
  );
};

export default PaymentPage;
