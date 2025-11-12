import { ObjectId } from "mongodb";

export interface User {
  _id?: ObjectId;
  email: string;
  password: string; 
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  resetToken?: string;
  resetTokenExpiry?: Date;
  verificationCode?: string;
  verificationCodeExpiry?: Date;
  isVerified: boolean;
}

export interface UserResponse {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  isVerified: boolean;
}

export function sanitizeUser(user: User): UserResponse {
  return {
    _id: user._id?.toString() || "",
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    createdAt: user.createdAt,
    isVerified: user.isVerified,
  };
}
