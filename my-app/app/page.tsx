"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-neutral-900 px-4">
      
      {/* Hero Section */}
      <div className="max-w-xl text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
          Password Manager Project
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          This project is a simple password manager assignment that allows you to generate strong passwords, save them securely, and manage your saved credentials. Keep your online accounts safe and organized!
        </p>
        
        {/* Action Buttons */}
        <div className="flex gap-4 justify-center mt-4">
          <Link href="/login">
            <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-700 transition">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 dark:bg-neutral-700 dark:text-white dark:hover:bg-neutral-600 transition">
              Signup
            </button>
          </Link>
        </div>
      </div>

      {/* Footer / Extra Info */}
      <footer className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
        &copy; 2025 Password Manager Project. All rights reserved.
      </footer>
    </div>
  );
}
