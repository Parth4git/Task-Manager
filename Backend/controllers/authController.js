import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import createAccessToken  from "../utils/token.js";
import { validateEmail } from "../utils/validation.js";


export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please fill all the fields" });
    }
    if (typeof name !== "string" || typeof email !== "string" || typeof password !== "string") {
      return res.status(400).json({ msg: "Please send string values only" });
    }


    if (password.length < 8) {
      return res.status(400).json({ msg: "Password length must be atleast 8 characters" });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ msg: "Invalid Email" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "This email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashedPassword });
    if(user){
      const token = createAccessToken({ id: user._id });
      res.cookie("token", token, { httpOnly: true });
    
    res.status(200).json({ msg: "Account has been created for you.." ,token});
  }
}
  catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ status: false, msg: "Please enter all details!!" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ status: false, msg: "This email is not registered!!" });

    const token = createAccessToken({ id: user._id });
      res.cookie("token", token, { httpOnly: true });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ status: false, msg: "Password incorrect!!" });
    res.status(200).json({ user, status: true, msg: "Login successful.."});
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ status: true, msg: "Logout successful.." });
  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
}