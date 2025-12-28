"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const db_js_1 = require("../db.js");
const User_js_1 = require("../models/User.js");
const mongodb_1 = require("mongodb");
const router = (0, express_1.Router)();
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRES_IN = "7d";
const registerSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string().min(8, "Password must be at least 8 characters"),
    firstName: zod_1.z.string().min(2, "First name must be at least 2 characters"),
    lastName: zod_1.z.string().min(2, "Last name must be at least 2 characters"),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format"),
    password: zod_1.z.string().min(1, "Password is required"),
});
const forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format"),
});
const verifyCodeSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format"),
    code: zod_1.z.string().length(6, "Code must be 6 digits"),
});
const resetPasswordSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email format"),
    code: zod_1.z.string().length(6, "Code must be 6 digits"),
    newPassword: zod_1.z.string().min(8, "Password must be at least 8 characters"),
});
function generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}
router.post("/register", async (req, res) => {
    try {
        const validation = registerSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: validation.error.issues.map((i) => ({
                    field: i.path[0],
                    message: i.message,
                })),
            });
        }
        const { email, password, firstName, lastName } = validation.data;
        const db = (0, db_js_1.getDb)();
        const existingUser = await db
            .collection("users")
            .findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User with this email already exists",
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = {
            email: email.toLowerCase(),
            password: hashedPassword,
            firstName,
            lastName,
            createdAt: new Date(),
            updatedAt: new Date(),
            isVerified: true,
        };
        const result = await db.collection("users").insertOne(newUser);
        const user = { ...newUser, _id: result.insertedId };
        const token = jsonwebtoken_1.default.sign({ userId: result.insertedId.toString(), email: user.email }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });
        console.log("\n=== NEW USER REGISTERED ===");
        console.log("Email:", email);
        console.log("Name:", firstName, lastName);
        console.log("========================\n");
        res.status(201).json({
            success: true,
            message: "Registration successful",
            token,
            user: (0, User_js_1.sanitizeUser)(user),
        });
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            success: false,
            message: "Server error during registration",
        });
    }
});
router.post("/login", async (req, res) => {
    try {
        const validation = loginSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: validation.error.issues.map((i) => ({
                    field: i.path[0],
                    message: i.message,
                })),
            });
        }
        const { email, password } = validation.data;
        const db = (0, db_js_1.getDb)();
        const user = await db
            .collection("users")
            .findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        const isValidPassword = await bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id.toString(), email: user.email }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN,
        });
        console.log("\n=== USER LOGGED IN ===");
        console.log("Email:", email);
        console.log("======================\n");
        res.json({
            success: true,
            message: "Login successful",
            token,
            user: (0, User_js_1.sanitizeUser)(user),
        });
    }
    catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Server error during login",
        });
    }
});
router.post("/forgot-password", async (req, res) => {
    try {
        const validation = forgotPasswordSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: validation.error.issues.map((i) => ({
                    field: i.path[0],
                    message: i.message,
                })),
            });
        }
        const { email } = validation.data;
        const db = (0, db_js_1.getDb)();
        const user = await db
            .collection("users")
            .findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.json({
                success: true,
                message: "If an account exists, a verification code has been sent",
            });
        }
        const code = generateVerificationCode();
        const expiry = new Date();
        expiry.setMinutes(expiry.getMinutes() + 15);
        await db.collection("users").updateOne({ _id: user._id }, {
            $set: {
                verificationCode: code,
                verificationCodeExpiry: expiry,
                updatedAt: new Date(),
            },
        });
        console.log("\n=== PASSWORD RESET REQUESTED ===");
        console.log("Email:", email);
        console.log("Verification Code:", code);
        console.log("Expires:", expiry.toISOString());
        console.log("================================\n");
        res.json({
            success: true,
            message: "Verification code sent to your email",
            code: process.env.NODE_ENV === "development" ? code : undefined,
        });
    }
    catch (error) {
        console.error("Forgot password error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});
router.post("/verify-code", async (req, res) => {
    try {
        const validation = verifyCodeSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: validation.error.issues.map((i) => ({
                    field: i.path[0],
                    message: i.message,
                })),
            });
        }
        const { email, code } = validation.data;
        const db = (0, db_js_1.getDb)();
        const user = await db
            .collection("users")
            .findOne({ email: email.toLowerCase() });
        if (!user || !user.verificationCode || !user.verificationCodeExpiry) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification code",
            });
        }
        if (user.verificationCode !== code) {
            return res.status(400).json({
                success: false,
                message: "Invalid verification code",
            });
        }
        if (new Date() > user.verificationCodeExpiry) {
            return res.status(400).json({
                success: false,
                message: "Verification code has expired",
            });
        }
        console.log("\n=== CODE VERIFIED ===");
        console.log("Email:", email);
        console.log("=====================\n");
        res.json({
            success: true,
            message: "Verification code is valid",
        });
    }
    catch (error) {
        console.error("Verify code error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});
router.post("/reset-password", async (req, res) => {
    try {
        const validation = resetPasswordSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: "Validation error",
                errors: validation.error.issues.map((i) => ({
                    field: i.path[0],
                    message: i.message,
                })),
            });
        }
        const { email, code, newPassword } = validation.data;
        const db = (0, db_js_1.getDb)();
        const user = await db
            .collection("users")
            .findOne({ email: email.toLowerCase() });
        if (!user || !user.verificationCode || !user.verificationCodeExpiry) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification code",
            });
        }
        if (user.verificationCode !== code) {
            return res.status(400).json({
                success: false,
                message: "Invalid verification code",
            });
        }
        if (new Date() > user.verificationCodeExpiry) {
            return res.status(400).json({
                success: false,
                message: "Verification code has expired",
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
        await db.collection("users").updateOne({ _id: user._id }, {
            $set: {
                password: hashedPassword,
                updatedAt: new Date(),
            },
            $unset: {
                verificationCode: "",
                verificationCodeExpiry: "",
            },
        });
        console.log("\n=== PASSWORD RESET SUCCESSFUL ===");
        console.log("Email:", email);
        console.log("=================================\n");
        res.json({
            success: true,
            message: "Password reset successful",
        });
    }
    catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
});
router.get("/me", async (req, res) => {
    try {
        const token = req.headers.authorization?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided",
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        const db = (0, db_js_1.getDb)();
        const user = await db
            .collection("users")
            .findOne({ _id: new mongodb_1.ObjectId(decoded.userId) });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.json({
            success: true,
            user: (0, User_js_1.sanitizeUser)(user),
        });
    }
    catch (error) {
        console.error("Get user error:", error);
        res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
});
exports.default = router;
