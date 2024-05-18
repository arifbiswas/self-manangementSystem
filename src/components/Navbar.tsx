"use client";

import { Button, DarkThemeToggle, Navbar } from "flowbite-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";

interface Props {
  collapsed?: boolean;
  setCollapsed?: (value: boolean) => void;
}

export function NavbarComponent({ collapsed, setCollapsed }: Props) {
  let pathName = usePathname();

  return (
    <Navbar fluid className="border-b">
      <div className="flex gap-4">
        {(collapsed === true || collapsed === false) && (
          <span>
            <Button
              onClick={() => setCollapsed && setCollapsed(!collapsed)}
              className={`mr-5 `}
            >
              <HiMenu size={20} />
            </Button>
          </span>
        )}
        <Navbar.Brand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-gray-200 cursor-pointer">
            Self Management System
          </span>
        </Navbar.Brand>
      </div>

      <div className="flex md:order-2">
        <Link href={pathName === "/" ? "setup" : "/"}>
          <Button className="text-gray-200">
            {pathName === "/" ? "Backend" : "Go Back"}
          </Button>
        </Link>
        <DarkThemeToggle className="mx-4" />
      </div>
      {/* <Navbar.Collapse>
        <Navbar.Link href="#" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">About</Navbar.Link>
        <Navbar.Link href="#">Services</Navbar.Link>
        <Navbar.Link href="#">Pricing</Navbar.Link>
        <Navbar.Link href="#">Contact</Navbar.Link>
      </Navbar.Collapse> */}
    </Navbar>
  );
}
