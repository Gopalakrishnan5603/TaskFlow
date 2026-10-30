import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; // We use bcryptjs to hash passwords instead of saving plain-text passwords
import User from "../models/user.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check required fields
        if (!name || !email || !password) {
            return res.status(400)
                .json({
                    success: false,
                    message: "Name, email and password are required"
                });
        }

        // check whether user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create the user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                password: user.password,
                role: user.role,
            }
        })
    } catch (err) {
        console.log("Registeration Error ", err.message);

        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.findOne({
            email: normalizedEmail,
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign(
            {
                userId: user._id.toString(),
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRES_IN || "1d",
            }
        );

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Login error:", error.message);

        return res.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
};


export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Get current user error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
