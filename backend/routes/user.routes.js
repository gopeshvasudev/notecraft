import express from "express";
import userModel, { userModelValidator } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const validationResult = userModelValidator({ username, email, password });

    if (validationResult) {
      return res.status(400).json({
        success: false,
        message: validationResult.message,
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      const salt = bcrypt.genSaltSync(12);
      const hashedPassword = bcrypt.hashSync(password, salt);

      await userModel.create({
        username,
        email,
        password: hashedPassword,
      });

      return res.status(200).json({
        success: true,
        message: "User created successfully",
      });
    } else {
      return res.status(409).json({
        success: false,
        message: "User already exists!",
      });
    }
  } catch (error) {
    console.log(`Registration error: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //Validation
    if (email == "" || password == "") {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await userModel.findOne({ email });
    if (user) {
      const isPasswordMatched = await bcrypt.compare(password, user.password);
      if (!isPasswordMatched) {
        return res.status(403).json({
          success: false,
          message: "Wrong user credentials",
        });
      } else {
        const jwtToken = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "3d" } // Set the expiration time for the JWT
        );
        return res
          .cookie("token", jwtToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 3, // 3 days
          })
          .status(200)
          .json({
            success: true,
            message: `Welcome back, ${user.username}!`,
          });
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
  } catch (error) {
    console.log(`Login error: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Server error, please try again later",
    });
  }
});

export default router;
