"use client";

import { useGetCollectoinsQuery } from "@/redux/feature/collections";

import Link from "next/link";

export function SidebarComponent({ collapsed, setCollapsed }: any) {
  const { data, isLoading } = useGetCollectoinsQuery("");

  return (
    <>
      {collapsed ? (
        <div className="p-8 w-80 hidden md:block  text-gray-800 dark:text-gray-200 bg-slate-300 dark:bg-gray-800">
          <div className="flex flex-col items-center gap-3">
            {data?.collections?.map((item) => {
              return (
                <Link
                  key={item._id}
                  className="w-full p-3  text-gray-800 dark:text-gray-200 bg-slate-50 dark:bg-gray-900 hover:dark:bg-gray-700 rounded-md text-center"
                  href={`/${item._id}`}
                >
                  {item?.title}
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-8 w-80 visible md:hidden text-gray-800 dark:text-gray-200 bg-slate-300 dark:bg-gray-800">
          <div className="flex flex-col items-center gap-3">
            {data?.collections?.map((item) => {
              return (
                <Link
                  key={item._id}
                  className="w-full p-3  text-gray-800 dark:text-gray-200 bg-slate-50 dark:bg-gray-900 hover:dark:bg-gray-700 rounded-md text-center"
                  href={`/${item._id}`}
                >
                  {item?.title}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
