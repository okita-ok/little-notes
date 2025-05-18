import { Schema, model, Types } from "mongoose";

const NoteSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: "User",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const NoteModel = model("Note", NoteSchema);
export default NoteModel;
