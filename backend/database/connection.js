import mongoose from "mongoose";

async function databaseConnection() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error.message);
  }
}

export default databaseConnection;
