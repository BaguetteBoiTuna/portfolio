import { LayoutTransition } from "@/components/animations/layout-transition";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutTransition
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </LayoutTransition>
  );
}
