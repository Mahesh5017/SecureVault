"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

interface SavePasswordFormProps {
  generatedPassword: string;
  userEmail: string;
}

export default function SavePasswordForm({ generatedPassword, userEmail }: SavePasswordFormProps) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    if (!title || !url || !generatedPassword) {
      setMsg("Please fill in all fields and generate a password first.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/add-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          title,
          url,
          username:username||"",
          password: generatedPassword,
        }),
        
      });
      console.log({
  email: userEmail,
  title,
  url,
  username,
  password: generatedPassword,
});

      const data = await res.json();

      if (res.ok) {
        setMsg("Password saved successfully!");
        setTitle("");
        setUrl("");
        setUsername("");
      } else {
        setMsg(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      setMsg("Error saving password.");
    }
    setLoading(false);
  }

  return (
    <Card className="w-full max-w-md mt-6">
      <CardHeader>
        <h2 className="text-lg font-semibold">Save This Password</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="e.g. Facebook"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="url">URL</Label>
          <Input
            id="url"
            placeholder="e.g. https://facebook.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="username">Username / Email</Label>
          <Input
            id="username"
            placeholder="e.g. user@example.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <Label>Password</Label>
          <Input value={generatedPassword} readOnly />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-3">
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Password"}
        </Button>
        {msg && <p className="text-sm text-gray-600 text-center">{msg}</p>}
      </CardFooter>
    </Card>
  );
}
