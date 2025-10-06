"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";

interface PasswordGeneratorProps {
  onGenerate?: (password: string) => void;
}

export default function PasswordGenerator({ onGenerate }: PasswordGeneratorProps) {
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [excludeLookAlike, setExcludeLookAlike] = useState(false);
  const [password, setPassword] = useState("");

  function generatePassword() {
    let chars = "abcdefghijklmnopqrstuvwxyz";
    if (includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+-={}[]";
    if (excludeLookAlike) chars = chars.replace(/[O0l1]/g, "");

    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(result);
    if (onGenerate) onGenerate(result);
  }

  async function copyToClipboard() {
    if (!password) return;
    await navigator.clipboard.writeText(password);
    alert("Copied! Password will clear in 15s.");
    setTimeout(async () => {
      await navigator.clipboard.writeText("");
    }, 15000);
  }

  return (
    <Card className="max-w-md mx-auto p-4 bg-white text-black shadow-md rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-center">
          Password Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="length">Length: {length}</Label>
          <Slider
            id="length"
            min={8}
            max={32}
            step={1}
            value={[length]}
            onValueChange={(v) => setLength(v[0])}
            className="mt-2"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={includeNumbers}
              onCheckedChange={(v) => setIncludeNumbers(Boolean(v))}
              id="numbers"
            />
            <Label htmlFor="numbers">Include Numbers</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              checked={includeSymbols}
              onCheckedChange={(v) => setIncludeSymbols(Boolean(v))}
              id="symbols"
            />
            <Label htmlFor="symbols">Include Symbols</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              checked={includeUppercase}
              onCheckedChange={(v) => setIncludeUppercase(Boolean(v))}
              id="uppercase"
            />
            <Label htmlFor="uppercase">Include Uppercase</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              checked={excludeLookAlike}
              onCheckedChange={(v) => setExcludeLookAlike(Boolean(v))}
              id="lookalike"
            />
            <Label htmlFor="lookalike">
              Exclude Look-alikes (O, 0, l, 1)
            </Label>
          </div>
        </div>

        <Button className="w-full" onClick={generatePassword}>
          Generate
        </Button>

        {password && (
          <div className="flex items-center justify-between border p-2 rounded-md">
            <code className="text-sm break-all">{password}</code>
            <Button
              variant="link"
              className="text-blue-600"
              onClick={copyToClipboard}
            >
              Copy
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
