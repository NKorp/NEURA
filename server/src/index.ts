import express from "express";
import type { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDatabase from "./config/database";
import launchRoutes from "./routes/launchRoutes";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();
connectDatabase();

app.use("/api", launchRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
