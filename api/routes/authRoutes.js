import express from 'express'
import { registerUser,verifyEmail,login, verifyCaptcha,sendOtpToMail } from '../controllers/authController.js';
const router = express.Router()

router.post('/register',registerUser);
router.post('/verifyemail',verifyEmail);
router.post('/verifycapctha',verifyCaptcha);
router.get('/otp/:id',sendOtpToMail);
router.post('/login',login);


export default router;