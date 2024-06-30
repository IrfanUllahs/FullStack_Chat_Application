import userModel from "../model/user_model.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({ message: "User Created!" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body, "req body is");
  try {
    const user = await userModel.findOne({ email });
    // console.log(user, "user is ");
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      return res.status(400).json({ message: "Invalid credential" });
    }
    const userData = user.toObject();
    delete userData.password;
    const token = Jwt.sign({ id: user._id }, "secret", {
      expiresIn: "1hr",
    });
    return res.status(200).json({ userData, token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};
const googleSignIn = async (req, res) => {
  const { email, name, googleId, image } = req.body;

  try {
    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({
        email,
        name,
        googleId,
        image,
      });
    }

    const token = Jwt.sign({ id: user._id, email: user.email }, "secret", {
      expiresIn: "1h",
    });

    const result = {
      _id: user._id.toString(),
      email,
      name,
      image,
      lastSeen: user.lastSeen,
      blockList: user.blockList,
    };
    res.status(200).json({ userData: result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
export default { register, login, googleSignIn };
