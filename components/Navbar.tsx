import React from "react";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link} from "@nextui-org/react";
import Image from "next/image";

export default function NavBar() {
  return (
    <Navbar>
      <NavbarBrand>
        <Link href = "/">
        <Image src='/logo.png' alt="Logo" width={200} height={100}/>
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="#">
            Market
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Trade
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#">
            Sign Up
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
