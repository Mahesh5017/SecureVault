import { Schema, model, models } from "mongoose";

const SavedPasswordSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  username: { type: String },
  password: { type: String, required: true },
});

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true }, // ✅ fix field name
  savedPasswords: {
    type: [SavedPasswordSchema],
    default: [],
  },
});

const User = models.User || model("User", UserSchema);
export default User;
