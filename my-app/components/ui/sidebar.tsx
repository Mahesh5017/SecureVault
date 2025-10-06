"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  IconLayoutDashboard,
  IconLock,
  IconLogout,
} from "@tabler/icons-react";

export const Sidebar = () => {
  const links = [
    { label: "Dashboard", href: "/workspace/dashboard", icon: <IconLayoutDashboard /> },
    { label: "Saved Passwords", href: "/workspace/passwords", icon: <IconLock /> },
  ];

  return (
    <Card className="flex flex-col justify-between h-screen w-64 p-4 bg-white dark:bg-neutral-900 border dark:border-neutral-700">
      {/* Top Logo */}
      <div className="flex items-center space-x-2 py-2">
        <div className="h-6 w-6 bg-black dark:bg-white rounded" />
        <span className="font-bold text-lg text-black dark:text-white">SecureVault</span>
      </div>

      {/* Middle Navigation Links */}
      <div className="flex-1 flex flex-col mt-6 space-y-2">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-neutral-800"
          >
            {link.icon}
            <span className="text-sm text-black dark:text-white">{link.label}</span>
          </Link>
        ))}
      </div>

      {/* Bottom Profile & Logout */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="my-app\public\avatar.png" alt="Profile" />
            <AvatarFallback>MA</AvatarFallback>
          </Avatar>
          <span className="text-sm text-black dark:text-white">User</span>
        </div>
        <Button
          variant="ghost"
          className="flex items-center gap-2 w-full justify-start text-sm"
          onClick={() => (window.location.href = "/login")}
        >
          <IconLogout />
          Logout
        </Button>
      </div>
    </Card>
  );
};
