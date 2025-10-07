"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { Pencil, Trash2 } from "lucide-react";

interface SavedPassword {
  _id: string;
  title: string;
  url: string;
  username?: string;
  password: string;
}

export default function SavedPasswordsPage() {
  const [passwords, setPasswords] = useState<SavedPassword[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Track which password is being edited
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<SavedPassword>>({});

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setUserEmail(storedEmail);
    } else {
      setError("User not logged in.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!userEmail) return;

    async function fetchPasswords() {
      try {
        const res = await fetch(`/api/get-passwords?email=${userEmail}`);
        const data = await res.json();

        if (res.ok) {
          setPasswords(data.passwords || []);
        } else {
          setError(data.error || "Failed to fetch passwords.");
        }
      } catch (err) {
        console.error(err);
        setError("Server error while fetching passwords.");
      }
      setLoading(false);
    }

    fetchPasswords();
  }, [userEmail]);

  async function handleDelete(id: string) {
    if (!userEmail) return;
    if (!confirm("Are you sure you want to delete this password?")) return;

    try {
      const res = await fetch(`/api/delete-password?id=${id}&email=${userEmail}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (res.ok) {
        setPasswords((prev) => prev.filter((p) => p._id !== id));
      } else {
        alert(data.error || "Failed to delete password.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error while deleting password.");
    }
  }

  async function handleEditSave(id: string) {
    if (!userEmail) return;

    try {
      const res = await fetch("/api/edit-password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail, id, ...editData }),
      });
      const data = await res.json();

      if (res.ok) {
        setPasswords((prev) =>
          prev.map((p) => (p._id === id ? { ...p, ...editData } : p))
        );
        setEditingId(null);
        setEditData({});
        alert("Password updated successfully!");
      } else {
        alert(data.error || "Failed to update password.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error while updating password.");
    }
  }

  if (loading) return <p className="text-center mt-20">Loading saved passwords...</p>;
  if (error) return <p className="text-center text-red-600 mt-20">{error}</p>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 dark:bg-neutral-900 p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">
        Saved Passwords
      </h1>

      {passwords.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No saved passwords yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 w-full max-w-6xl">
          <AnimatePresence>
            {passwords.map((pass) => {
              const isEditing = editingId === pass._id;

              return (
                <motion.div
                  key={pass._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="relative group overflow-hidden shadow-sm hover:shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-neutral-800 transition-all duration-300">
                    
                    {/* Hover buttons */}
                    <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      {isEditing ? (
                        <Button variant="secondary" size="icon" onClick={() => handleEditSave(pass._id)}>
                          Save
                        </Button>
                      ) : (
                        <Button variant="ghost" size="icon" onClick={() => {
                          setEditingId(pass._id);
                          setEditData({
                            title: pass.title,
                            url: pass.url,
                            username: pass.username,
                            password: pass.password,
                          });
                        }}>
                          <Pencil className="h-4 w-4 text-gray-700 dark:text-gray-300" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(pass._id)}>
                        <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                      </Button>
                    </div>

                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-semibold text-gray-800 dark:text-white">
                        {isEditing ? (
                          <input
                            value={editData.title || ""}
                            onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                            className="w-full border-b border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-white"
                          />
                        ) : (
                          pass.title
                        )}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-2">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-semibold">URL:</span>{" "}
                        {isEditing ? (
                          <input
                            value={editData.url || ""}
                            onChange={(e) => setEditData({ ...editData, url: e.target.value })}
                            className="w-full border-b border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-white"
                          />
                        ) : (
                          <a
                            href={pass.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {pass.url}
                          </a>
                        )}
                      </p>

                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        <span className="font-semibold">Username:</span>{" "}
                        {isEditing ? (
                          <input
                            value={editData.username || ""}
                            onChange={(e) => setEditData({ ...editData, username: e.target.value })}
                            className="w-full border-b border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-white"
                          />
                        ) : (
                          pass.username || "—"
                        )}
                      </p>

                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        <span className="font-semibold">Password:</span>{" "}
                        {isEditing ? (
                          <input
                            value={editData.password || ""}
                            onChange={(e) => setEditData({ ...editData, password: e.target.value })}
                            className="w-full border-b border-gray-300 dark:border-gray-600 bg-transparent text-gray-800 dark:text-white font-mono"
                          />
                        ) : (
                          <span className="font-mono bg-gray-100 dark:bg-neutral-700 px-2 py-0.5 rounded">
                            {pass.password}
                          </span>
                        )}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
