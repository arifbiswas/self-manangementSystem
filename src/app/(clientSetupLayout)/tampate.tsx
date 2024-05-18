"use client";
import { NavbarComponent } from "@/components/Navbar";
import { SidebarComponent } from "@/components/Sidebar";
import { useGetCollectoinsQuery } from "@/redux/feature/collections";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import LoadingPage from "../loading";
import { Button } from "flowbite-react";
import Link from "next/link";

export default function Template({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(true);
  const { data, isLoading, isSuccess } = useGetCollectoinsQuery("");
  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-white dark:bg-gray-800 ">
      {data?.collections.length !== 0 ? (
        <>
          <NavbarComponent collapsed={collapsed} setCollapsed={setCollapsed} />
          <div className="flex-1 flex h-full w-[100vw] max-w-[100vw] no-scrollbar">
            <SidebarComponent
              collapsed={collapsed}
              setCollapsed={setCollapsed}
            />
            {children}
            <Toaster position="top-right" reverseOrder={false} />
          </div>
        </>
      ) : (
        <>
          <div className=" flex  min-h-screen w-[100vw]  no-scrollbar justify-center items-center">
            <Link href="/setup">
              <Button>You Need To Setup Bankend</Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
