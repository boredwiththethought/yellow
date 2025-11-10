import mongoose, { Schema, Document } from "mongoose";

export interface ISize extends Document {
  label: string;
}

const SizeSchema: Schema = new Schema({
  label: { type: String, required: true, unique: true },
});

export default mongoose.model<ISize>("Size", SizeSchema);
