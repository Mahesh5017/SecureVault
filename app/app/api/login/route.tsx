import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "../../lib/db";
import User from "../../models/User";

export async function POST(req: Request) {
  await connectDB();
  const { email, password } = await req.json();

  if (!email || !password)
    return NextResponse.json({ error: "All fields required" }, { status: 400 });

  const user = await User.findOne({ email });
  if (!user)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid)
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });

  return NextResponse.json({ message: "Login successful!" });
}
