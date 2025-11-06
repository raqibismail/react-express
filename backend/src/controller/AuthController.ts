import "dotenv/config";
import prisma from "../prisma/client";
import bcrypt from "bcrypt";
import { UserModel } from "../model/User";
import { AppError } from "../middleware/ErrorHandlers";
import jwt from "jsonwebtoken";
import { generateToken, verifyToken } from "../utils/token";

// Define input/output types
export type RegisterInput = {
  email: string;
  name: string;
  password: string;
};

export type LoginInput = {
  email: string;
  password: string;
};

export type SafeUser = Omit<UserModel, "password">;

export async function register(data: RegisterInput): Promise<SafeUser> {
  // Validate input
  if (!data.email || !data.password || !data.name) {
    throw new AppError(400, "Missing required fields");
  }

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new AppError(400, "User already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Create user
  const user = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      password: hashedPassword,
    },
  });

  // Remove password from response
  const { password, ...safeUser } = user;
  return safeUser;
}

export async function login(data: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email: data.email } });

  if (!user) throw new AppError(404, "User not found");

  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) throw new AppError(401, "Invalid credentials");

  // Generate JWT using centralized utility
  const token = generateToken({ userId: user.id });

  // Calculate session expiry (same as JWT expiry)
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await prisma.session.create({
    data: {
      userId: user.id,
      token,
      expiresAt,
    },
  });

  // Return safe user
  const { password: _, ...safeUser } = user;
  return { user: safeUser, token };
}

export async function logout(token: string) {
  if (!token) {
    throw new AppError(400, "Missing token");
  }

  let payload;
  try {
    payload = verifyToken(token); // Verify JWT validity
  } catch (err) {
    throw new AppError(401, "Invalid or expired token");
  }

  // Delete the session tied to this token
  const deletedSession = await prisma.session.deleteMany({
    where: { token, userId: payload.userId },
  });

  if (deletedSession.count === 0) {
    throw new AppError(404, "Session not found or already logged out");
  }

  // Update user's lastLogin (marking their last active time)
  await prisma.user.update({
    where: { id: payload.userId },
    data: { lastLogin: new Date() },
  });

  return { message: "Logout successful" };
}
