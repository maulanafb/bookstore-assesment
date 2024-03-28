import { Request, Response, Router } from "express";
import { OrderService } from "../services/order.service";

const router = Router();
const orderService = new OrderService();

/**
 * @swagger
 * /api/v1/orders:
 *   post:
 *     summary: Create a new order (Need Token)
 *     description: Creates a new order for a user.
 *     security:
 *       - bearerAuth: []  # Mengindikasikan bahwa endpoint memerlukan token bearer
 *     parameters:
 *       - in: body
 *         name: book id
 *         description: book id
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             bookId:
 *               type: integer
 *       - in: header
 *         name: Authorization
 *         description: Bearer Token
 *         required: true
 *         example: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJpYXQiOjE3MTE1MDYzNDIsImV4cCI6MTcxMTUwOTk0Mn0.h0Z7R6_0VTPctLqEmWjIq8U8hH9fkWjfiRK_tQYmp4A
 *         schema:
 *           type: string
 *           format: jwt
 *     responses:
 *       '201':
 *         description: Order created successfully
 *       '400':
 *         description: Bad request (e.g., invalid data)
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.post("/", async (req: Request, res: Response) => {
  const userId = req.user?.id;
  console.log(req.user);
  const { bookId } = req.body;
  try {
    const order = await orderService.createOrder(userId!, bookId);
    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
});

/**
 * @swagger
 * /api/v1/orders/{orderId}:
 *   put:
 *     summary: Cancel an existing order (Need Token)
 *     description: Cancels an order based on its ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: ID of the order to cancel
 *         example: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJpYXQiOjE3MTE1MDYzNDIsImV4cCI6MTcxMTUwOTk0Mn0.h0Z7R6_0VTPctLqEmWjIq8U8hH9fkWjfiRK_tQYmp4A
 *         schema:
 *           type: integer
 *       - in: header
 *         name: Authorization
 *         description: Bearer Token
 *         required: true
 *         schema:
 *           type: string
 *           format: jwt
 *     responses:
 *       '200':
 *         description: Order cancelled successfully
 *       '404':
 *         description: Order not found
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.put("/:orderId", async (req: Request, res: Response) => {
  const { orderId } = req.params;
  try {
    const order = await orderService.cancelOrder(Number(orderId));
    res.status(200).json(order);
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({ message: "Failed to cancel order" });
  }
});

/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     summary: Fetch orders for a user (Need Token)
 *     description: Retrieves a list of orders placed by a user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: offset
 *         description: Pagination offset
 *         example: bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJpYXQiOjE3MTE1MDYzNDIsImV4cCI6MTcxMTUwOTk0Mn0.h0Z7R6_0VTPctLqEmWjIq8U8hH9fkWjfiRK_tQYmp4A
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         description: Number of results to return
 *         schema:
 *           type: integer
 *       - in: header
 *         name: Authorization
 *         description: Bearer Token
 *         required: true
 *         schema:
 *           type: string
 *           format: jwt
 *     responses:
 *       '200':
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       '500':
 *         description: Internal server error
 */
router.get("/", async (req: Request, res: Response) => {
  const userId = req.user?.id;
  const { offset, limit } = req.query;
  try {
    const orders = await orderService.getOrdersByUserId(
      userId,
      Number(offset),
      Number(limit)
    );
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

export default router;
