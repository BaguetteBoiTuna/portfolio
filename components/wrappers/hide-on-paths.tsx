"use client";

import { usePathname } from "next/navigation";

interface HideOnPathsProps {
  paths: string[];
  children: React.ReactNode;
}

export default function HideOnPaths({ paths, children }: HideOnPathsProps) {
  const pathname = usePathname();
  const shouldHide = paths.some((p) => pathname.startsWith(p));
  if (shouldHide) return null;
  return <>{children}</>;
}
