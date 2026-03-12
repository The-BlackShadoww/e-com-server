import mongoose, { Document, Schema } from "mongoose";

export interface ICart extends Document {
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CartSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<ICart>("Cart", CartSchema);

