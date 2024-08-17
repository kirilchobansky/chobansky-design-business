import { Schema, model, Types } from "mongoose";

export interface IOrder {
  enquiry: string;
  email: string;
  name: string;
  phone: number;
  owner: Types.ObjectId;
  project: Types.ObjectId;
}

const OrderSchema = new Schema<IOrder>(
  {
    enquiry: { type: String, required: true },
    email: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    project: { type: Schema.Types.ObjectId, ref: "Project" },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

export const Order = model<IOrder>("Order", OrderSchema);
