"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  MessageSquare,
  LayoutGrid,
  Workflow,
  Settings,
  ChevronsUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

const navItems = [
  { label: "Chat", href: "/dashboard", icon: MessageSquare },
  { label: "Workspace", href: "/dashboard/workspace", icon: LayoutGrid },
  { label: "Automations", href: "/dashboard/automations", icon: Workflow },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-64 shrink-0 flex-col border-r border-black/[0.06] dark:border-white/[0.06] bg-surface/75 backdrop-blur-xl md:flex">
      <div className="flex items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary shadow-sm">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-base font-semibold text-foreground">
            Lumina AI
          </span>
        </Link>
        <ThemeToggle />
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-black/[0.06] dark:bg-white/[0.06] text-foreground font-medium"
                  : "text-muted hover:bg-black/[0.03] dark:hover:bg-white/[0.03] hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4 text-primary-500 dark:text-primary-400" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-black/[0.06] dark:border-white/[0.06] p-3">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-black/[0.03] dark:hover:bg-white/[0.04]">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 text-xs font-semibold text-foreground">
            JD
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium text-foreground">
              Jordan Davis
            </p>
            <p className="truncate text-xs text-muted">Pro plan</p>
          </div>
          <ChevronsUpDown className="h-4 w-4 text-muted" />
        </button>
      </div>
    </aside>
  );
}
