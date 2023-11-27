import businessModel from "../models/business.js";
import userModel from "../models/user.js";

export const createBusiness = async (req, res) => {
  let businessDoc = req.body;

  try {
    const business = await businessModel.create(businessDoc);
    // Update owner's businesses array
    const owner = await userModel.findByIdAndUpdate(
      business.owner,
      { $push: { businesses: business._id } },
      { new: true }
    );

    if (!owner) {
      // Rollback if updating owner fails
      await businessModel.findByIdAndDelete(business._id);
      return res.status(404).json({ message: "Owner not found" });
    }

    res.status(201).json({ business, owner });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteBusiness = async (req, res) => {
  const { id } = req.params;

  try {
    const business = await businessModel.findByIdAndDelete(id);

    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    // Remove business ID from owner's businesses array
    const owner = await userModel.findByIdAndUpdate(
      business.owner,
      { $pull: { businesses: business._id } },
      { new: true }
    );

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    res.status(200).json({ owner });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const editBusiness = async (req, res) => {
  const { id } = req.params;
  const updatedBusinessData = req.body;

  try {
    const business = await businessModel.findByIdAndUpdate(
      id,
      updatedBusinessData,
      { new: true } // Return the updated document
    );

    if (!business) {
      return res.status(404).json({ message: "Business not found" });
    }

    res
      .status(200)
      .json({ message: "Business updated successfully", business });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBusinesses = async (req, res) => {
  try {
    const businesses = await businessModel.find();
    res.status(200).json({ businesses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserBusinesses = async (req, res) => {
  const { userId } = req.body;

  try {
    // Find the user
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get the user's businesses array
    const userBusinessIds = user.businesses;

    // Fetch each business from the array
    const userBusinesses = await Promise.all(
      userBusinessIds.map(async (businessId) => {
        const business = await businessModel.findById(businessId);
        return business;
      })
    );

    console.log(userBusinesses);

    res.status(200).json({ userBusinesses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
