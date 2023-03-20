import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import Otp from "../models/otpModel.js";
import transporter from "../config/email.js";
import axios from "axios";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
// @desc: Register user
// @route: api/auth/register
// @method: POST
// @access : public
export const registerUser = async (req, res) => {
  try {
    const { email, firstName, lastName, contact, password } = req.body;

    console.log(req.body);
    if (!email || !firstName || !lastName || !contact || !password) {
      throw new Error("please fill all the fields");
    }

    //check if already exists
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      throw new Error("User already Exists");
    }

    //Create a user with hashed password
    const salt = bcrypt.genSaltSync(10);
    const Hash = bcrypt.hashSync(password, salt);

    const user = await User.create({
      firstName,
      lastName,
      email,
      contact,
      password: Hash,
    });

    if (!user) throw new Error("User registration failed");

    //generating the otp and updating in the database ortherwise creating
    const otp = generateOTP();
    const createOTP = await Otp.create({
      userId: user._id,
      otp,
    });
    console.log(createOTP)
    if (!createOTP) throw new Error("otp couldn't created");

    //sending message to users mail
    let message = {
      from: "tportal280@gmail.com",
      to: user.email,
      subject: "Email Verification",
      text: `OTP for you account verification is ${otp}. It is valid for 5 mins, please do not share or disclose to anyone`,
    };
    transporter.sendMail(message, function (err, info) {
      if (err) {
        throw err;
      }

      return res.status(201).json({
        status: "success",
        message: "Email verified successfully",
        id: user._id,
      });
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message, status: "error" });
  }
};

// @desc: verify the captcha for the user
// @route: api/auth/verifycapctha
// @method: POST
// @access : public
export const verifyCaptcha = async (req, res) => {
  try {
    const { token } = req.body;
    if (token === null) {
      res.status(400);
      throw new Error("Please verify as a human");
    }
    //send secret key and response token to google
    const { status } = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${token}`
    );
    if (status == 200) {
      return res.status(200).json({ message: "verified" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", message: error.message });
  }
};

// @desc: send otp to mail for email verification
// @route: api/auth/login
// @method: POST
// @access : public
export const sendOtpToMail = async (req, res) => {
  try {
    const id = req.params.id;

    //checking for the user if does not exist throwing new error
    const user = await User.findById({ _id: id });
    if (!user) {
      res.status(404);
      throw new Error("User does not exist");
    }

    //generating the otp and updating in the database ortherwise creating
    const otp = generateOTP();
    const createOTP = await Otp.create({
      userId: user._id,
      otp,
    });
    if (!createOTP) throw new Error("otp couldn't created");

    //sending message to users mail
    let message = {
      from: "tportal280@gmail.com",
      to: user.email,
      subject: "Email Verification",
      text: `OTP for you account verification is ${otp}. It is valid for 5 mins, please do not share or disclose to anyone`,
    };
    transporter.sendMail(message, function (err, info) {
      if (err) {
        throw err;
      }

      return res.status(201).json({
        status: "success",
        message: "Email verified successfully",
        id: user._id,
      });
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message, status: "error" });
  }
};

// @desc: Login user
// @route: api/auth/login
// @method: POST
// @access : public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(400);
      throw new Error("User does not exist");
    }
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id, user.admin);
      res.status(200).json({
        status: "success",
        token,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message, status: "error" });
  }
};

//Verifying Email
//@ method:POST
//@ router: api/auth/verifyemail
//@ access: User/Public
export const verifyEmail = async (req, res) => {
  try {
    const { otp, id } = req.body;
    if (!otp) throw new Error("Otp Didn't received");

    const verifyOtp = await Otp.findOne({ userId: id });
    console.log(verifyOtp)
    if (!verifyOtp) throw new Error("Otp Expired");
    if (verifyOtp.otp == otp) {
      const user = await User.findOneAndUpdate(
        { _id: id },
        {
          status: true,
        }
      );
      return res.json({
        status: "success",
        message: "Otp verified successfully",
      });
    } 
  } catch (error) {
    console.log(error);
    return res.json({ error: error.message, status: "error" });
  }
};

//generate otp
const generateOTP = () => {
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP = OTP + parseInt(Math.random() * 10);
  }
  return OTP;
};

//generate Token
const generateToken = (id, admin) => {
  return jwt.sign({ id, admin }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
