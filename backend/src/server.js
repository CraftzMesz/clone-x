import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import userRoutes from "./routes/user.routes.js";
const app = express();
app.use(cors());
app.use(express.json());

app.use(clerkMiddleware());

app.get("/", (req, res) => res.send("Hello from server")); // Ini juga akan ter-override oleh try/catch di bawah jika servernya berhasil start

app.use("/api/users", userRoutes);

const startServer = async () => {
  try {
    await connectDB();
    // Gunakan template literal
    app.listen(ENV.PORT, () =>
      console.log(`Server is running on PORT:${ENV.PORT} ✅`)
    );
  } catch (error) {
    // Gunakan template literal
    console.error(`Failed to start server: ${error.message} ❎`);
    process.exit(1);
  }
};

startServer();
