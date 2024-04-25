import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 3,
    max: 25,
  },
  email: {
    type: String,
    required: true,
    max: 25,
  }
},{timestamps: true});

const UserModel = mongoose.model("User", userSchema);
export default UserModel;
