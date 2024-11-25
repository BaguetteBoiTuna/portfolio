"use client";
import { Link } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import type { Route } from "next";

interface RouterLinkProps {
  href: string;
  children: string;
  className?: string;
  isExternal?: boolean;
  isBlock?: boolean;
  isDisabled?: boolean;
  ping?: string;
  download?: string | boolean;
  rel?: string;
  underline?: "none" | "hover" | "always" | "active" | "focus";
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "foreground";
  size?: "sm" | "md" | "lg";
}

export default function RouterLink({ ...props }: RouterLinkProps) {
  const router = useRouter();

  const handleLinkClick = () => {
    router.push(props.href as Route);
  };

  return (
    <Link onClick={handleLinkClick} {...props}>
      {props.children}
    </Link>
  );
}
