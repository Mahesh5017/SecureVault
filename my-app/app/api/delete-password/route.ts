import { NextResponse } from "next/server";
import connectDB from "@/app/lib/db";
import User from "@/app/models/User";

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");
    const id = searchParams.get("id");

    if (!email || !id) {
      return NextResponse.json({ error: "Missing email or id" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Filter out the password with matching _id
    user.savedPasswords = user.savedPasswords.filter(
      (p: any) => p._id.toString() !== id
    );
    await user.save();

    return NextResponse.json({ success: true, message: "Password deleted" });
  } catch (error) {
    console.error("Error deleting password:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
