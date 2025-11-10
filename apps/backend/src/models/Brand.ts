import mongoose, { Schema, Document } from "mongoose";

export interface IBrand extends Document {
  name: string;
}

const BrandSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
});

export default mongoose.model<IBrand>("Brand", BrandSchema);
