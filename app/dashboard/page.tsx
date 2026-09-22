"use client";

import { TopNav } from "@/components/dashboard/TopNav";
import { ChatSidebar } from "@/components/dashboard/ChatSidebar";
import { ChatInterface } from "@/components/dashboard/ChatInterface";
import { ChatProvider } from "@/components/dashboard/ChatContext";

export default function DashboardPage() {
  return (
    <ChatProvider>
      <TopNav />
      <div className="flex flex-1 overflow-hidden">
        <ChatSidebar />
        <ChatInterface />
      </div>
    </ChatProvider>
  );
}
