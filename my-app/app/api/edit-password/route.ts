import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import User from "@/app/models/User";

export async function PUT(req: Request) {
  try {
    const { email, id, title, url, username, password } = await req.json();

    if (!email || !id) {
      return NextResponse.json({ error: "Missing email or id" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const passwordEntry = user.savedPasswords.id(id);
    if (!passwordEntry) {
      return NextResponse.json({ error: "Password entry not found" }, { status: 404 });
    }

    // Update fields if provided
    if (title) passwordEntry.title = title;
    if (url) passwordEntry.url = url;
    if (username) passwordEntry.username = username;
    if (password) passwordEntry.password = password;

    await user.save();

    return NextResponse.json({ success: true, message: "Password updated" });
  } catch (error) {
    console.error("Error editing password:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
