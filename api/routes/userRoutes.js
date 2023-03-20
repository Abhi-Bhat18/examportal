import express from "express";
import {
  getuserDetails,
  register,
  withdrawRegistration,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getuserDetails);
router.post("/register", register);
router.delete("/exam/:examId", withdrawRegistration);

export default router;
