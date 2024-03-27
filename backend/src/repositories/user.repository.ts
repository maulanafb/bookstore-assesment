import { PrismaClient, User as PrismaUser } from "@prisma/client";
import { User } from "../entities/user.entity";

const prisma = new PrismaClient();

export class UserRepository {
  async findById(id: number): Promise<PrismaUser | null> {
    return await prisma.user.findUnique({
      where: {
        id: id,
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
