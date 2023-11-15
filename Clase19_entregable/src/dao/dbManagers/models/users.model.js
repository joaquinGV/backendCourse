import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  ageL: Number,
  password: String,
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

const usersModel = mongoose.model(userCollection, userSchema);

export default usersModel;
