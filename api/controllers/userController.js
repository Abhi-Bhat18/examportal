import Exam from "../models/examModel.js";
import User from "../models/userModel.js";

// @desc: Get all the availabel exam
// @route: api/exams
// @method: POST
// @access : user
export const getExams = async (req, res) => {
  try {
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

// @desc: Register for an exam
// @route: api/user/register
// @method: POST
// @access : user
export const register = async (req, res) => {
  try {
    const id = req.userId;
    const { examId } = req.body;

    const user = await User.findOneAndUpdate(
      { _id: id },
      { $addToSet: { exams: examId } }
    );

    const candidate = {
      userId: id,
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
    };
    const exam = await Exam.findOneAndUpdate(
      {
        _id: examId,
      },
      {
        $addToSet: {
          candidates: id,
        },
      }
    );
    // if (!exam) throw new Error("Registration unsuccessful");
    return res.json({ message: "Registration successful", satus: "success" });
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", message: error.message });
  }
};

// @desc: get user details
// @route: api/user
// @method: GET
// @access : user

export const getuserDetails = async (req, res) => {
  try {
    const id = req.userId;
    const user = await User.findById({ _id: id }).populate(
      "exams",
      "category date endTime startTime city title description"
    );

    if (!user) throw new Error("Bad Request");
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", message: error.message });
  }
};

// @desc: withdraw candidate from exam and exam from user
// @route: api/user/exam/:examId
// @method: DELETE
// @access : user
export const withdrawRegistration = async (req, res) => {
  try {
    const userId = req.userId;
    const { examId } = req.params;

    const user = await User.findByIdAndUpdate(
      {
        _id: userId,
      },
      {
        $pull: { exams: examId },
      }
    );
    if (!user) throw new Error("Something went wrong");

    const exam = await Exam.findByIdAndUpdate(
      { _id: examId },
      {
        $pull: {
          candidates: {
            userId,
          },
        },
      }
    );

    return res.json({ message: "withdrawn successfully", status: "success" });
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", message: error.message });
  }
};
