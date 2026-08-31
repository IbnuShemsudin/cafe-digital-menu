import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Admin from "../models/Admin.js";
import connectDB from "../config/db.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    console.log("Connecting to MongoDB...");

    await connectDB();

    const name = process.env.ADMIN_NAME;
    const email =
      process.env.ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.ADMIN_PASSWORD;

    if (!name || !email || !password) {
      throw new Error(
        "ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD must be defined in .env"
      );
    }

    if (password.length < 6) {
      throw new Error(
        "ADMIN_PASSWORD must be at least 6 characters."
      );
    }

    const existingAdmin = await Admin.findOne({
      email,
    });

    if (existingAdmin) {
      console.log("");
      console.log("Admin already exists.");
      console.log(`Email: ${existingAdmin.email}`);
      console.log(`Role: ${existingAdmin.role}`);
      console.log("");

      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(
      password,
      12
    );

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
      isActive: true,
    });

    console.log("");
    console.log("======================================");
    console.log("     ADMIN CREATED SUCCESSFULLY");
    console.log("======================================");
    console.log(`Name:  ${admin.name}`);
    console.log(`Email: ${admin.email}`);
    console.log(`Role:  ${admin.role}`);
    console.log("======================================");
    console.log("");

    process.exit(0);
  } catch (error) {
    console.error("");
    console.error("Failed to seed admin:");
    console.error(error);
    console.error("");

    process.exit(1);
  }
};

seedAdmin();