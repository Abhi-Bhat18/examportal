import Exam from "../models/examModel.js";

export const getTests = async (req, res) => {
  try {
    const userId = req.userId;
    const exams = await Exam.find({}).select(
      "title category city startTime endTime createdBy date description"
    );
    if (!exams) {
      return res.status(404).json({ message: "No exams found" });
    }
    return res.status(200).json(exams);
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message, status: "error" });
  }
};

export const createTest = async (req, res) => {
  try {
    const { title, category, city, startTime, endTime, date, description } =
      req.body;
    const createdBy = req.userId;
    console.log(req.userId);
    const exam = await Exam.create({
      title,
      category,
      city,
      date,
      startTime,
      endTime,
      createdBy,
      date,
      description,
    });
    if (exam) {
      return res.status(201).json({ message: "exam created successful" });
    } else {
      throw new Error("Exams is not created");
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message, status: "error" });
  }
};

export const deleteTest = async (req, res) => {
  try {
    const {id} = req.params

    const test = await Exam.deleteOne({ _id: id });
    if (!test) throw new Error("couldn't delete");
    return res.json({
      status: "success",
      message: "EXAM deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message, status: "error" });
  }
};

export const getTestDeatils = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const exam = await Exam.findById({ _id: id }).populate(
      "candidates",
      "email firstName lastName"
    );
    if (!exam) throw new Error("Bad Request");
    return res.json(exam);
  } catch (error) {
    return res.json({ message: error.message, status: "success" });
  }
};
