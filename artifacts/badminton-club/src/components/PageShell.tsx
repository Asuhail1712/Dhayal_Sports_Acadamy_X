import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function PageShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="detail-shell relative min-h-screen overflow-x-clip text-foreground">
      <Navbar />
      <main className={"relative z-10 " + className}>{children}</main>
      <Footer />
    </div>
  );
}
