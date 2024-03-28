import jwt from "jsonwebtoken";
import { User } from "../entities/user.entity";

export class AuthService {
  private readonly secretKey: string;

  constructor(secretKey: string) {
    this.secretKey = secretKey;
  }

  generateToken(user: User): string {
    const { name, email } = user;
    const token = jwt.sign({ name, email }, this.secretKey, {
      expiresIn: "24h",
    });
    return token;
  }
}
