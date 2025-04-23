import mongoose from "mongoose";
// const {schema} = mongoose

const todoschema = new mongoose.Schema({
  todoName: {
    type: String,
    lowercase: true,
  },
  todoMassage: {
    type: String,
    lowercase: true,
  },
  creatorId : {
    type : String
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true })


export const todos =  mongoose.model('todo', todoschema);