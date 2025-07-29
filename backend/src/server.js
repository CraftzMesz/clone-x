import express from "express";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";

const app = express();

app.get("/", (req, res) => res.send("Hello from server")) // Ini juga akan ter-override oleh try/catch di bawah jika servernya berhasil start

const startServer = async () => {
  try {
    await connectDB();
    // Gunakan template literal
    app.listen(ENV.PORT, () => console.log(`Server is running on PORT:${ENV.PORT} ✅`));
  } catch (error) {
    // Gunakan template literal
    console.error(`Failed to start server: ${error.message} ❎`);
    process.exit(1);
  }
}

startServer();

