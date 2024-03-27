// app.ts
import express, { Request, Response } from "express";
import { config } from "./config";

import loginRouter from "./controllers/login.controller"; // Import controller untuk login
import registerRouter from "./controllers/register.controller"; // Import controller untuk register
import bookController from "./controllers/book.controller";
import orderController from "./controllers/order.controller";
import userController from "./controllers/user.controller";
import { authenticateJWT } from "./middlewares/jwt-auth";
import swaggerUi from "swagger-ui-express";
import specs from "./api-docs";

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use("/users", userController);
app.use("/books", bookController);
app.use("/orders", authenticateJWT, orderController);
app.use("/login", loginRouter);
app.use("/register", registerRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
// Setup middleware, pengaturan lainnya, dan aktifkan server
app.use((req: Request, res: Response) => {
  res.status(404).send("404 Not Found");
});
const PORT = config.port || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
