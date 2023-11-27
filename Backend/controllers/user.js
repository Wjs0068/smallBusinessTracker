import userModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const hashPassword = async (password) => {
  console.log(password);
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email },
    process.env.SECRET_KEY,
    { expiresIn: "24h" }
  );
};

export const userExists = async (email) => {
  const user = await userModel.findOne({ email });
  return !!user; // Returns true if the user exists, false otherwise
};

export const createUser = async (req, res) => {
  let userDoc = req.body;
  const hashedPassword = await hashPassword(userDoc.password);
  userDoc.hashed_password = hashedPassword;

  try {
    const user = await userModel.create(userDoc);
    const token = generateToken(user);

    const userData = user.toObject();
    delete userData.hashed_password;

    res
      .status(201)
      .json({ message: "User created successfully", token, userData });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(
      password,
      user.hashed_password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Password is valid, generate a token using the function
    const token = generateToken(user);

    const userData = user.toObject();
    delete userData.hashed_password;

    res.status(200).json({ message: "Login successful", token, userData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUserProfile = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOneAndDelete({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// user.js
export const updateUserField = async ({ _id, field, value }) => {
  try {
    const user = await userModel.findOneAndUpdate(
      { _id },
      { [field]: value },
      { new: true } // Return the updated document
    );

    if (!user) {
      console.log("User not found");
    }

    console.log("User field updated successfully:", user);
    return user; // Return the updated user
  } catch (error) {
    console.error("Error updating user field:", error.message);
    throw error; // Throw the error to be caught by the calling function
  }
};
