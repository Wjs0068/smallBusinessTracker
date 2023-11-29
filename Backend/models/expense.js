import mongoose from "mongoose";

const businessSchema = new mongoose.Schema(
  {
    business: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: String,
    description: String,
    miles: Number,
    amount: Number,
    receipts: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const businessModel = mongoose.model("Business", businessSchema);

export default businessModel;
