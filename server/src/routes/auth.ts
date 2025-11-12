import { Router } from "express";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { getDb } from "../db.js";
import type { User } from "../models/User.js";
import { sanitizeUser } from "../models/User.js";
import { ObjectId } from "mongodb";

const router = Router();

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";
const JWT_EXPIRES_IN = "7d";

const registerSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email format"),
});

const verifyCodeSchema = z.object({
  email: z.string().email("Invalid email format"),
  code: z.string().length(6, "Code must be 6 digits"),
});

const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email format"),
  code: z.string().length(6, "Code must be 6 digits"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
});


function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

router.post("/register", async (req: Request, res: Response) => {
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
    const db = getDb();


    const existingUser = await db
      .collection<User>("users")
      .findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists",
      });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser: Omit<User, "_id"> = {
      email: email.toLowerCase(),
      password: hashedPassword,
      firstName,
      lastName,
      createdAt: new Date(),
      updatedAt: new Date(),
      isVerified: true,
    };

    const result = await db.collection<User>("users").insertOne(newUser as any);
    const user = { ...newUser, _id: result.insertedId };


    const token = jwt.sign(
      { userId: result.insertedId.toString(), email: user.email },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      }
    );

    console.log("\n=== NEW USER REGISTERED ===");
    console.log("Email:", email);
    console.log("Name:", firstName, lastName);
    console.log("========================\n");

    res.status(201).json({
      success: true,
      message: "Registration successful",
      token,
      user: sanitizeUser(user as User),
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
    });
  }
});


router.post("/login", async (req: Request, res: Response) => {
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
    const db = getDb();


    const user = await db
      .collection<User>("users")
      .findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }


    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { userId: user._id!.toString(), email: user.email },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      }
    );

    console.log("\n=== USER LOGGED IN ===");
    console.log("Email:", email);
    console.log("======================\n");

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
});


router.post("/forgot-password", async (req: Request, res: Response) => {
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
    const db = getDb();

    const user = await db
      .collection<User>("users")
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

    await db.collection<User>("users").updateOne(
      { _id: user._id },
      {
        $set: {
          verificationCode: code,
          verificationCodeExpiry: expiry,
          updatedAt: new Date(),
        },
      }
    );

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
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});


router.post("/verify-code", async (req: Request, res: Response) => {
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
    const db = getDb();

    const user = await db
      .collection<User>("users")
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
  } catch (error) {
    console.error("Verify code error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

router.post("/reset-password", async (req: Request, res: Response) => {
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
    const db = getDb();

    const user = await db
      .collection<User>("users")
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


    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.collection<User>("users").updateOne(
      { _id: user._id },
      {
        $set: {
          password: hashedPassword,
          updatedAt: new Date(),
        },
        $unset: {
          verificationCode: "",
          verificationCodeExpiry: "",
        },
      }
    );

    console.log("\n=== PASSWORD RESET SUCCESSFUL ===");
    console.log("Email:", email);
    console.log("=================================\n");

    res.json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});


router.get("/me", async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      email: string;
    };
    const db = getDb();

    const user = await db
      .collection<User>("users")
      .findOne({ _id: new ObjectId(decoded.userId) });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user: sanitizeUser(user),
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
});

export default router;
