import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    expenses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expense", // Reference to the Expense model
      },
    ],
    sales: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sale", // Reference to the Sale model
      },
    ],
    name: {
      type: String,
      required: true,
    },
    description: String, // You can add any other fields as needed
    address: String,
    website: String,
    logo: String,
  },
  { timestamps: true }
);

const businessModel = mongoose.model("Business", businessSchema);

export default businessModel;
