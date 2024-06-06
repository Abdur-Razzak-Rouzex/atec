"use client"

import { columns } from "@/components/shared/table/columns";
import { DataTable } from "@/components/shared/table/data-table";
import { Payment } from "@/types";
import React, { useState, useEffect } from "react";

// Define the async function to fetch payment data
async function getPayment(): Promise<Payment[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/users');
  const data = await res.json();
  return data;
}

// Define the PaymentPage component
const PaymentPage: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    const fetchPayments = async () => {
      const data = await getPayment();
      setPayments(data);
    };

    fetchPayments();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="my-5 text-2xl font-bold">Payments</h1>
      <DataTable columns={columns} data={payments} />
    </div>
  );
};

export default PaymentPage;
