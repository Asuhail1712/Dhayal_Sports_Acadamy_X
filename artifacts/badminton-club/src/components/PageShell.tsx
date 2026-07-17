import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function PageShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground selection:bg-primary/20 selection:text-primary-foreground">
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.035]">
        <img
          src={`${import.meta.env.BASE_URL}images/court-texture.png`}
          alt="Texture"
          className="h-full w-full object-cover"
        />
      </div>
      <Navbar />
      <main className={`relative z-10 pt-28 md:pt-32 ${className}`.trim()}>{children}</main>
      <Footer />
    </div>
  );
}
