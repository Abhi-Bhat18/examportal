import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
mongoose.set('strictQuery', false);

const connectDb = async ()=>{
    await mongoose.connect(process.env.MONGO_URI)
}

export default connectDb;