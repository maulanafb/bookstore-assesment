import { PrismaClient, User as PrismaUser } from "@prisma/client";
import { User } from "../entities/user.entity";

const prisma = new PrismaClient();
interface PrismaUserSelection {
  id: number;
  name: string;
  email: string;
  points: number;
}
export class UserRepository {
  async updatePoints(userId: number, points: number): Promise<void> {
    try {
      await prisma.user.update({
        where: { id: userId },
        data: { points: points },
      });
    } catch (error) {
      throw new Error(`Failed to update user points`);
    }
  }
  async findById(id: number): Promise<PrismaUserSelection | null> {
    return await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        points: true,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    const prismaUser: PrismaUser | null = await prisma.user.findUnique({
      where: { email },
    });
    return this.convertToUser(prismaUser);
  }

  async createUser(user: User): Promise<User> {
    const prismaUser: PrismaUser = await prisma.user.create({ data: user });
    return this.convertToUser(prismaUser)!;
  }
  private convertToUser(prismaUser: PrismaUser | null): User | null {
    if (!prismaUser) return null;
    const { id, name, email, password, points } = prismaUser;
    return { id, name, email, password, points }; // Konversi id menjadi number
  }
}
