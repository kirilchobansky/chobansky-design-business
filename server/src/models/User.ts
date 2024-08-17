import { Schema, model, Types } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  address: string;
  phone: number;
  profilePicture: string;
  isAdmin: boolean;
  favoriteProjects: Types.ObjectId[];
  comments: Types.ObjectId[];
  orders: Types.ObjectId[];
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String },
    phone: { type: Number },
    profilePicture: { type: String },
    isAdmin: { type: Boolean, required: true },
    favoriteProjects: [{ type: Schema.Types.ObjectId, ref: "Project" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, 12);
    this.password = hash;
  }
});

export const User = model<IUser>("User", userSchema);
