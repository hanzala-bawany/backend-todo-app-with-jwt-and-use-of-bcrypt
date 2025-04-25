import mongoose from "mongoose";

const loginUserschema = new mongoose.Schema({
  perHourLoginCount: {
    type: Number,
    lowercase: true,
  },
  startDate: {
    type: String,
    lowercase: true,
  },
  endDate : {
    type : String,
    lowercase: true,   
  }
}, { timestamps: true })


export const loginUsers =  mongoose.model('loginUser', loginUserschema)