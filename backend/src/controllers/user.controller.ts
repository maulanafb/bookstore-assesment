// user.controller.ts
import express, { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";
const router = express.Router();
const userService = new UserService();
router.get("/user", async (req: Request, res: Response) => {
  const userId = req.user?.id;
  console.log(req.user);
  // Lakukan logika Anda dengan userId yang diperoleh
  try {
    const user = await userService.getUserById(userId!);
    // console.log(user);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error find user:", error);
    res.status(500).json({ message: "Failed to find user" });
  }
});

export default router;
