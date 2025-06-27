import { Document, model, Schema } from "mongoose";

export interface User extends Document {
  name: string;
  username: string;
  password: string;
  lastJti?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    lastJti: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        delete ret.password;
        delete ret.lastJti;
        return ret;
      },
    },
  }
);

export const UserModel = model<User>("User", userSchema);
