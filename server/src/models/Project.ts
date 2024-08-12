import { Schema, model, Types } from "mongoose";

export interface Project {
  id: string;
  name: string;
  price: number;
  area: number;
  images: string[];
  description: string;
  comments: Types.ObjectId[];
}

export const ProjectSchema = new Schema<Project>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    area: { type: Number, required: true },
    images: { type: [String], required: true },
    description: { type: String, required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

export const Project = model<Project>("Project", ProjectSchema);
