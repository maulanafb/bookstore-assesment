import express, { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { AuthService } from "../services/auth.service"; // Import AuthService

const router = express.Router();
const userService = new UserService();
const authService = new AuthService("your-secret-key"); // Inisialisasi AuthService dengan secret key yang sesuai

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register new user
 *     description: Register a new user with name, email, and password.
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to register
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: The name of the user
 *               example: John Doe
 *             email:
 *               type: string
 *               description: The email address of the user
 *               example: john.doe@example.com
 *             password:
 *               type: string
 *               format: password
 *               description: The password for the user account
 *               example: password123
 *     responses:
 *       '201':
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User' # Ganti dengan referensi skema user yang sesuai
 *       '400':
 *         description: Bad request (e.g., missing required fields)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the reason for failure
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email, and password are required" });
    }

    const newUser = await userService.registerUser(name, email, password);

    // Generate JWT token using AuthService
    // Note: Implement this part according to your authentication mechanism

    res.status(201).json({ user: newUser });
  } catch (error) {
    if (typeof error === "string") {
      return res.status(400).json({ message: error });
    } else if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(400).json({ message: "An error occurred" });
    }
  }
});

export default router;
