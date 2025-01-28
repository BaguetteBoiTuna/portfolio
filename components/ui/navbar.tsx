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
} from "@heroui/react";
import RouterLink from "./router-link";
import GlitchText from "./glitch-text";

export default function MinimalNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar
      className="w-full z-50 sm:w-[70%] rounded-xl mt-3 mx-auto"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarBrand>
        <RouterLink href="/" className="text-3xl glitch">
          <GlitchText text="TunaSub" />
        </RouterLink>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex" justify="center">
        <NavbarItem>
          <RouterLink href="/" className="glitch">
            <GlitchText text="Home" />
          </RouterLink>
        </NavbarItem>
        <NavbarItem>
          <RouterLink href="/about" className="glitch">
            <GlitchText text="About" />
          </RouterLink>
        </NavbarItem>
        <NavbarItem>
          <RouterLink href="/tools" className="glitch">
            <GlitchText text="Tools" />
          </RouterLink>
        </NavbarItem>
        <NavbarItem>
          <RouterLink href="/projects" className="glitch">
            <GlitchText text="Projects" />
          </RouterLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="sm:hidden" justify="end">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
          className="sm:hidden text-deep-blue"
        />
      </NavbarContent>
      <NavbarMenu className="sm:hidden z-50 w-full rounded-xl mt-4 p-5 gap-3">
        <NavbarMenuItem>
          <RouterLink href="/">Home</RouterLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <RouterLink href="/about">About</RouterLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <RouterLink href="/tools">Tools</RouterLink>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <RouterLink href="/projects">Projects</RouterLink>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
