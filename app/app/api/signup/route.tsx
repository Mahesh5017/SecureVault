import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "../../lib/db";
import User from "../../models/User";

export async function POST(req: Request) {
  await connectDB();
  const { email, password } = await req.json();

  if (!email || !password)
    return NextResponse.json({ error: "All fields required" }, { status: 400 });

  const existing = await User.findOne({ email });
  if (existing)
    return NextResponse.json({ error: "User already exists" }, { status: 400 });

  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({ email, passwordHash });

  return NextResponse.json({ message: "Signup successful!" });
}
