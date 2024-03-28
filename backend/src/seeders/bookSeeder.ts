import { PrismaClient } from "@prisma/client";

export async function seedDummyBooks() {
  const prisma = new PrismaClient();

  // Function to select random tags
  function getRandomTags() {
    const tagsList = ["fiction", "non-fiction", "science", "essay"];
    const randomTags = [];
    const numTags = Math.floor(Math.random() * tagsList.length) + 1; // Random number of tags (1 to 4)
    for (let i = 0; i < numTags; i++) {
      const randomIndex = Math.floor(Math.random() * tagsList.length);
      randomTags.push(tagsList[randomIndex]);
    }
    return randomTags;
  }

  try {
    const dummyBooks = [];
    for (let i = 1; i <= 20; i++) {
      dummyBooks.push({
        title: `Book Title ${i}`,
        writer: `Writer ${i}`,
        coverImage: "cover1.jpg",
        price: Math.floor(Math.random() * 100) + 1,
        tags: getRandomTags(), // Random tags
      });
    }

    await prisma.book.createMany({ data: dummyBooks });
    console.log("Dummy books created successfully");
  } catch (error) {
    console.error("Error creating dummy books:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Call the function to seed dummy books
seedDummyBooks();
