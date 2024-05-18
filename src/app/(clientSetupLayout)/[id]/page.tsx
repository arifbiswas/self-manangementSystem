"use client";

import LoadingPage from "@/app/(serverSetupLayout)/loading";
import TableComponent from "@/components/TableComponent";
import { useGetCollectoinQuery } from "@/redux/feature/collections";
import { useParams } from "next/navigation";

import React from "react";

const SubMainPage = () => {
  const { id }: { id: string } = useParams();
  const { data: collection, isLoading, isSuccess } = useGetCollectoinQuery(id);
  if (isLoading && !isSuccess) {
    return <LoadingPage />;
  }
  // console.log(collection);
  return (
    <div className="flex-1 flex">
      <TableComponent collection={collection?.collection} />
    </div>
  );
};

export default SubMainPage;
