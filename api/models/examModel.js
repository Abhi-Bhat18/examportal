import mongoose from "mongoose";

const examSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    city: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    createdBy: { type: mongoose.SchemaTypes.ObjectId, required: true },
    candidates: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Exam", examSchema);
