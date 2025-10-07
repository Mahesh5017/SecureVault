# Password Manager Project

A simple **Password Manager** built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **MongoDB**. This project allows users to **generate strong passwords**, **save them securely**, and **manage saved credentials**.  

---

## Features

- **User Authentication**  
  - Signup with email and password  
  - Login to access workspace  

- **Password Generator**  
  - Generate strong, secure passwords  
  - Customize length, symbols, numbers, and uppercase letters  

- **Password Management**  
  - Save passwords with title, URL, and username/email  
  - View saved passwords in a professional card layout  
  - Edit or delete saved passwords  

- **Responsive Design**  
  - Works on desktop and mobile  
  - Dark and light mode support  

---

## Tech Stack

- **Frontend:** Next.js 15.5+, React, Tailwind CSS, TypeScript  
- **Backend:** Next.js API routes  
- **Database:** MongoDB (Atlas or local) with Mongoose  
- **Other:** Lucide React Icons, motion/React for card animations  

---

## Schema

### User Schema

```ts
import mongoose, { Schema, model } from "mongoose";

interface SavedPassword {
  title: string;
  url: string;
  username?: string;
  password: string;
}

interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  savedPasswords: SavedPassword[];
}

const savedPasswordSchema = new Schema<SavedPassword>({
  title: { type: String, required: true },
  url: { type: String, required: true },
  username: { type: String, default: "" },
  password: { type: String, required: true },
});

const userSchema = new Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedPasswords: [savedPasswordSchema],
});

const User = model<UserDocument>("User", userSchema);
export default User;
