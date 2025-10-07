"use client";

import { useState, useEffect } from "react";
import PasswordGenerator from "@/app/components/PasswordGenerator";
import SavePasswordForm from "@/app/components/SavePasswordForm";

export default function WorkspacePage() {
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
    } else {
      setError("User not logged in.");
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-6 space-y-6 md:space-y-0 md:space-x-8 min-h-screen bg-gray-50 dark:bg-neutral-900">
      
      {/* Password Generator */}
      <div className="w-full md:w-1/2 flex justify-center">
        <PasswordGenerator onGenerate={setGeneratedPassword} />
      </div>

      {/* Save Password Form */}
      <div className="w-full md:w-1/2 flex justify-center">
        <SavePasswordForm
          generatedPassword={generatedPassword}
          userEmail={userEmail || ""}
        />
      </div>
    </div>
  );
}
