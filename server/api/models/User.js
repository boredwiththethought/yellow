"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sanitizeUser = sanitizeUser;
function sanitizeUser(user) {
    return {
        _id: user._id?.toString() || "",
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
        isVerified: user.isVerified,
    };
}
