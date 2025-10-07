import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import User from "@/app/models/User";

// POST /api/add-password
export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, title, url, password } = await req.json();

    if (!email || !title || !url || !password) {
      return NextResponse.json(
        { error: "All fields (email, title, url, password) are required." },
        { status: 400 }
      );
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    // Add the new password entry
    user.savedPasswords.push({ title, url, password });
    await user.save();

    return NextResponse.json({
      message: "Password saved successfully!",
      data: user.savedPasswords,
    });
  } catch (error: any) {
    console.error("Error saving password:", error);
    return NextResponse.json(
      { error: "Server error while saving password." },
      { status: 500 }
    );
  }
}
