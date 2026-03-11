import mongoose, { Document, Schema } from "mongoose";

export interface ICart extends Document {
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
