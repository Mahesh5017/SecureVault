"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  IconLayoutDashboard,
  IconLock,
  IconLogout,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "Dashboard", href: "/workspace", icon: <IconLayoutDashboard /> },
    { label: "Saved Passwords", href: "/workspace/savedPasswords", icon: <IconLock /> },
  ];

  return (
    <>
      {/* Mobile Hamburger Button */}
      <Button
        className="fixed top-4 right-4 z-50 md:hidden bg-gray-200 dark:bg-neutral-900 p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
      </Button>

      {/* Sidebar */}
      <Card
        className={`
          fixed top-0 left-0 h-screen w-64 p-4 bg-gray-200 dark:bg-neutral-900 border dark:border-neutral-700
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:flex
          flex flex-col justify-between z-40
        `}
      >
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
              onClick={() => setIsOpen(false)} // close sidebar on mobile click
            >
              {link.icon}
              <span className="text-sm text-black dark:text-white">{link.label}</span>
            </Link>
          ))}
        </div>

        {/* Bottom Profile & Logout */}
        <div className="flex flex-col gap-2 mt-4">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="avatar.png" alt="Profile" />
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

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
