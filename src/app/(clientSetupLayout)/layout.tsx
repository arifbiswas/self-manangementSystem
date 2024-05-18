"use client";

import { NavbarComponent } from "@/components/Navbar";
import { SidebarComponent } from "@/components/Sidebar";
import { store } from "@/redux/store";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import Template from "./tampate";

export default function FirstLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <Template>{children}</Template>
    </Provider>
  );
}
