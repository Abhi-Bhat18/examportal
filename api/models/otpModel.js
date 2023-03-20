import mongoose  from "mongoose";

const otpSchema = new mongoose.Schema({
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt: { type: Date, expires: "5m", default: Date.now() }
})

export default mongoose.model('Otp',otpSchema)