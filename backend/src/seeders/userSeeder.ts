import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export async function seedDummyUser() {
  const prisma = new PrismaClient();

  try {
    const hashedPassword = await hashPassword("password");
    await prisma.user.create({
      data: {
        id: 100,
        name: "testing",
        email: "test@test.com",
        password: hashedPassword,
      },
    });
    console.log("User seeded successfully");
  } catch (error) {
    console.error("Error seeding user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

seedDummyUser();
