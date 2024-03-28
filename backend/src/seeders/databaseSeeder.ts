import { seedDummyBooks } from "./bookSeeder";
import { seedDummyUser } from "./userSeeder";
import { seedDummyOrders } from "./orderSeeder";

function seedDatabase() {
  try {
    seedDummyUser();

    seedDummyBooks();

    console.log("Database seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

// Call the function to seed the database
seedDatabase();
