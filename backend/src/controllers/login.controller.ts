import express, { Request, Response } from "express"; // Import express dan tipe Request dan Response

import { UserService } from "../services/user.service";

const router = express.Router();
const userService = new UserService();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User Login
 *     description: Login user with email and password.
 *     parameters:
 *       - in: body
 *         name: login
 *         description: user login to get token
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: The ID of the logged-in user
 *                 username:
 *                   type: string
 *                   description: The username of the logged-in user
 *       '400':
 *         description: Invalid request or login credentials
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
  // Menggunakan tipe Request dan Response
  const { email, password } = req.body;
  try {
    const user = await userService.loginUser(email, password);
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
