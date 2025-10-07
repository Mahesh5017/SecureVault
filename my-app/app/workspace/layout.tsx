"use client";

import { Sidebar } from "@/components/ui/sidebar";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-gray-50 dark:bg-neutral-800 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
