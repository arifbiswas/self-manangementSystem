"use client";

import TableComponent from "@/components/TableComponent";
import { useGetCollectoinsQuery } from "@/redux/feature/collections";

import React from "react";
import LoadingPage from "../loading";

const MainPage = () => {
  const { data, isLoading, isSuccess } = useGetCollectoinsQuery("");
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="flex-1 flex">
      <TableComponent collection={isSuccess ? data?.collections[0] : {}} />
    </div>
  );
};

export default MainPage;
