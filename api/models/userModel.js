import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, min: 6 },
    status: { type: Boolean, required: true, default: false },
    admin: { type: Boolean, default: false },
    exams: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Exam",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
