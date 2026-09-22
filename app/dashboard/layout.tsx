import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileNav } from "@/components/dashboard/MobileNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background md:flex-row">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">{children}</div>
      <MobileNav />
    </div>
  );
}
