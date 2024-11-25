"use client";
import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  NavbarContent,
} from "@nextui-org/react";
import RouterLink from "./router-link";

export default function MinimalNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      className="w-full sm:w-[70%] rounded-xl mt-3 mx-auto"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarBrand>
        <RouterLink href="/" className="font-getai text-3xl text-deep-blue">
          TunaSub
        </RouterLink>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex" justify="center">
        <NavbarItem>
          <RouterLink href="/about" className="font-satoshi">
            About
          </RouterLink>
        </NavbarItem>
        <NavbarItem>
          <RouterLink href="/projects" className="font-satoshi">
            Projects
          </RouterLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="sm:hidden" justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          className="sm:hidden text-deep-blue"
        />
      </NavbarContent>
      <NavbarMenu className="sm:hidden w-full rounded-xl mt-4 p-5 gap-3">
        <NavbarMenuItem>
          <RouterLink href="/about" className="font-satoshi">
            About
          </RouterLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <RouterLink href="/projects" className="font-satoshi">
            Projects
          </RouterLink>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
