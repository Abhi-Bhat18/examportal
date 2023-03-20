import express from 'express'
import { createTest,deleteTest, getTests,getTestDeatils } from '../controllers/adminController.js';
const router = express.Router()

router.get('/exams',getTests)
router.get('/exam/:id',getTestDeatils)
router.post('/create',createTest);
router.delete('/exam/:id',deleteTest)


export default router