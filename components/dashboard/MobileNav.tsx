"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, LayoutGrid, Workflow, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Chat", href: "/dashboard", icon: MessageSquare },
  { label: "Workspace", href: "/dashboard/workspace", icon: LayoutGrid },
  { label: "Automations", href: "/dashboard/automations", icon: Workflow },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="flex h-14 w-full items-center justify-around border-t border-white/[0.08] bg-surface/90 backdrop-blur-xl md:hidden shrink-0 z-40">
      {navItems.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 py-1 px-3 text-[10px] font-medium transition-colors",
              active
                ? "text-primary-400 font-semibold"
                : "text-muted hover:text-foreground"
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
