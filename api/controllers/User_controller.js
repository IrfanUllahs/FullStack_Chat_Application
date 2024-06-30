import userModel from "../model/user_model.js";
import upload from "../middlewares/multer.js";
import mongoose from "mongoose";

export const getUsers = async (req, res) => {
  const { currentuserid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(currentuserid)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const users = await userModel
      .find({ _id: { $ne: currentuserid } })
      .select("-password");
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: `Something went wrong ${error}` });
  }
};

export const getUser = async (req, res) => {
  const userId = req.params.userId;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    let user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "No user found!" });
    }
    user = user.toObject();
    delete user.password;
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: `Something went wrong ${error}` });
  }
};

export const blockUser = async (req, res) => {
  const { blockUserId, userId } = req.params;

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(blockUserId)
  ) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const user = await userModel.findByIdAndUpdate(
      userId,
      {
        $addToSet: { blockList: blockUserId },
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...userData } = user._doc;
    res.status(200).json({ userData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const unblockUser = async (req, res) => {
  const { userId, unblockUserId } = req.params;

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(unblockUserId)
  ) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    const user = await userModel.findByIdAndUpdate(
      userId,
      { $pull: { blockList: unblockUserId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { password, ...userData } = user._doc;
    res.status(200).json({ userData });
  } catch (error) {
    console.error("Error during unblock operation:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  try {
    let updateUser = await userModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name: req.body.name,
          image: req.file?.filename,
          lastSeen: req.body.lastSeen,
        },
      },
      { new: true }
    );

    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }

    let result = {
      name: updateUser.name,
      email: updateUser.email,
      image: updateUser.image,
      _id: updateUser._id.toString(),
    };
    res.status(200).json({ userData: result });
  } catch (error) {
    console.error("Error during update operation:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default { getUser, getUsers, blockUser, unblockUser, updateUser };
