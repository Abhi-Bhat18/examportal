import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, min: 6 },
    status: { type: Boolean, required: true, default: false },
    exams: [
      { examId:mongoose.SchemaTypes.ObjectId }
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Admin", adminSchema);
