"use client";

import { Sidebar } from "@/components/ui/sidebar";
import PasswordGenerator from "../components/PasswordGenerator";
import SavePasswordForm from "../components/SavePasswordForm";
import { useState } from "react";

export default function WorkspacePage() {
  const [generatedPassword, setGeneratedPassword] = useState("");
  const userEmail = "john.doe@example.com" // Replace this with logged-in user’s email

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 dark:bg-neutral-800">
        <div className="flex flex-col items-center space-y-4">
          <PasswordGenerator onGenerate={setGeneratedPassword} />
          <SavePasswordForm generatedPassword={generatedPassword} userEmail={userEmail} />
        </div>
      </div>
    </div>
  );
}
