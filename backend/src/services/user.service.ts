import bcrypt from "bcrypt";
import { User } from "../entities/user.entity";
import { UserRepository } from "../repositories/user.repository";
import { AuthService } from "./auth.service";
import { config } from "../config";

export class UserService {
  private userRepository: UserRepository;
  private authService: AuthService;

  constructor() {
    const JWT_SECRET = config.JWT_SECRET;
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    this.userRepository = new UserRepository();
    this.authService = new AuthService(JWT_SECRET);
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.findById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  async registerUser(
    name: string,
    email: string,
    password: string
  ): Promise<{ user: User; accessToken: string }> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("Email is already registered");
    }

    // Hash the password
    const hashedPassword = await this.hashPassword(password);

    // Create new user
    const newUser: User = {
      name,
      email,
      password: hashedPassword,
      points: 100,
    };
    const createdUser = await this.userRepository.createUser(newUser);

    // Generate JWT token
    const accessToken = this.authService.generateToken(createdUser);

    // Return user data without password and access token separately
    return { user: { ...createdUser, password: "" }, accessToken };
  }

  async loginUser(
    email: string,
    password: string
  ): Promise<{ user: User; accessToken: string } | null> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    // Verify password
    const isPasswordValid = await this.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // Generate JWT token
    const accessToken = this.authService.generateToken(user);

    // Return user data without password and access token separately
    return { user: { ...user, password: "" }, accessToken };
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async verifyPassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
