"use client";
import { NavbarComponent } from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

export default function FirstLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <div className="flex flex-col min-h-screen overflow-hidden bg-white dark:bg-gray-800 ">
        <NavbarComponent />
        {children}
        <Toaster position="top-right" reverseOrder={false} />
      </div>
    </Provider>
  );
}
