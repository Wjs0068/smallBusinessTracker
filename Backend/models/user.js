import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    businesses: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    firstName: String,
    lastName: String,
    profilePicture: String,
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
