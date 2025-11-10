import mongoose, { Schema, Document } from "mongoose";

export interface IColor extends Document {
  label: string;
  colorCode: string;
}

const ColorSchema: Schema = new Schema({
  label: { type: String, required: true },
  colorCode: { type: String, required: true },
});

export default mongoose.model<IColor>("Color", ColorSchema);
