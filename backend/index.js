import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import databaseConnection from "./database/connection.js";
import userRouter from "./routes/user.routes.js";
import noteRouter from "./routes/user.routes.js";

//Middlewares

dotenv.config();
databaseConnection();
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routers

app.use("/api/user", userRouter);
app.use("api/note", noteRouter);

app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
