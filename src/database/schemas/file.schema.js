import { database } from "../connection";
import mongoose from "mongoose";
const { Schema } = mongoose;

const FileSchema = new Schema({
  cid: { type: String, required: true },
  name: { type: String, required: true },
  mimeType: { type: String },
  downloadToken: { type: String },
  uploadedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
});

export default database.model("File", FileSchema);
