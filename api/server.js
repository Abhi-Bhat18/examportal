import express from "express";
import dotenv from "dotenv";
import cors from 'cors'


import connectDb from "./config/db.js";
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js'
import userRoutes from './routes/userRoutes.js'
import userAuth from './middlewares/userMiddleware.js'
import adminAuth from "./middlewares/adminMiddleware.js";
import { getExams } from "./controllers/userController.js";
dotenv.config(); 
// Connecting the database to the application
connectDb()
.then(() => console.log("MongoDB instance connected successfully"))
.catch((err) => console.log(err));

const app = express();

//MIDDLEWARES
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

//ROUTES
app.use('/api/auth',authRoutes)
app.use('/api/admin',adminAuth,adminRoutes)
app.use('/api/user/',userAuth,userRoutes)
app.get("/api/exams",getExams);


app.listen(process.env.PORT, () => {
  console.log(`Server is listening at http://localhost:${process.env.PORT}`);
});


