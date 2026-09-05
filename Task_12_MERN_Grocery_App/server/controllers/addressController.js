import Address from "../models/Address.js";

// Get user addresses
export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json({ success: true, addresses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add new delivery address
export const addAddress = async (req, res) => {
  try {
    const { firstName, lastName, email, street, city, state, zipcode, country = "India", phone, isDefault } = req.body;

    if (!firstName || !lastName || !street || !city || !state || !zipcode || !phone) {
      return res.status(400).json({ success: false, message: "Please fill in all address details" });
    }

    if (isDefault) {
      await Address.updateMany({ userId: req.userId }, { isDefault: false });
    }

    const address = await Address.create({
      userId: req.userId,
      firstName,
      lastName,
      email: email || "user@example.com",
      street,
      city,
      state,
      zipcode,
      country,
      phone,
      isDefault: Boolean(isDefault),
    });

    res.status(201).json({ success: true, message: "Delivery address saved", address });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update existing address
export const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findOneAndUpdate(
      { _id: id, userId: req.userId },
      req.body,
      { new: true }
    );

    if (!address) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    res.json({ success: true, message: "Address updated", address });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete address
export const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const address = await Address.findOneAndDelete({ _id: id, userId: req.userId });

    if (!address) {
      return res.status(404).json({ success: false, message: "Address not found" });
    }

    res.json({ success: true, message: "Address deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
