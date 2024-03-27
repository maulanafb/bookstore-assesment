import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserService } from "../services/user.service";
import { User } from "../entities/user.entity";

const userService = new UserService();

interface AuthenticatedUser {
  email: string; // Sesuaikan dengan tipe data ID dari model User Anda
  // Tambahkan properti lain dari user yang relevan, jika ada
}

export const authenticateJWT = async (
  req: Request & { user?: User }, // Menggunakan tipe User untuk properti user
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET as string, async (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      try {
        const userData = await userService.getUserByEmail(
          (user as AuthenticatedUser).email
        );

        if (userData) {
          req.user = userData; // Menetapkan userData dengan tipe User
          next();
        } else {
          res.status(404).json({ message: "User not found" });
        }
      } catch (error) {
        console.error("Error finding user:", error);
        res.status(500).json({ message: "Failed to authenticate user" });
      }
    });
  } else {
    res.sendStatus(401);
  }
};
