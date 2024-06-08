/* import { columns } from "@/components/shared/table/columns";
import { DataTable } from "@/components/shared/table/data-table";
import { posts } from "@/data/post";
import React from "react";

const PaymentPage = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="my-5 text-2xl font-bold">Payments</h1>
      <DataTable columns={columns} data={posts} />
    </div>
  );
};

export default PaymentPage; */


import { columns } from "@/components/shared/table/columns";
import { DataTable } from "@/components/shared/table/data-table";
import { getPosts } from "@/data/post";
import React from "react";

const  PostPage =async () => {
  const data = await getPosts();
  
  return (
    <div className="container mx-auto py-10">
      <h1 className="my-5 text-2xl font-bold">All posts</h1>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default PostPage;
