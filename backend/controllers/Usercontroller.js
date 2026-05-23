import UserModel from "../models/User.js";
import QueryModel from "../models/Query.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUserQuery = async (req, res) => {
    let { name, email, message } = req.body;
    console.log(req.body)

    const NewUser = new QueryModel({
        name: name,
        email: email,
        message: message,
    })
    await NewUser.save();
}

export const registerUser = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const existingUser = await UserModel.findOne({ email });
        const url = req.file.path;
        const filename = req.file.filename
        if (!existingUser) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const NewUser = new UserModel({
                username: username,
                email: email,
                password: hashedPassword,
            });
            if (req.file) {
                NewUser.userDP = {
                    url: req.file.path,
                    filename: req.file.filename
                };
            }
            await NewUser.save();
            res.status(200).json({ success: true, message: "User registered successfully" });
        } else {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            });

        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Registration failed"
        });
    }

}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            console.log(isMatch)
            if (!isMatch) {
                return res.status(401).json({ success: false, message: "Invalid credentials: Incorrect password" });
            }
            else {
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "2h" });
                res.cookie("token", token,
                    {
                        httpOnly: true,
                        secure: true,
                        sameSite: "none"
                    })
                return res.status(200).json({
                    success: true,
                    message: "User login successful",
                });
            }
        } else {
            return res.status(401).json({ success: false, message: "Invalid credentials: User not found" });
        }

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "Internal server error during login" });
    }
}

export const logoutUser = (req, res) => {
    const cookie = req.cookies
    console.log(cookie)
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });

    res.json({ message: "Logout successful", success: true });
}

export const navbardata = async (req, res) => {
    const userId = req.user;
    const token = req.token
    const userdetail = await UserModel.findById(userId)
    res.json({ userdetail: userdetail, token: token })
}

export const updateuser = async (req, res) => {
    const userId = req.user;
    const { username, email } = req.body;
    const updateData = { username, email };

    if (req.file) {
        updateData.userDP = { url: req.file.path };
    }
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            updateData,
            { new: true } // IMPORTANT UPDATE => latest data return
        ).select("-password");

        if (updatedUser) {
            res.json({ success: true, message: "User updated successfully", user: updatedUser });
        } else {
            res.status(404).json({ success: false, message: "User not found" });
        }
        console.log(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ success: false, message: "Failed to update user" });
    }

}

export const testurl = async (req, res) => {
    res.json({ messsage: "test subject api url" })
}


export const usercheck = async (req, res) => {
    res.json({
        success: true,
        user: req.user
    })
}
