import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRouter from "./routers/product.router.js";
import cors from "cors";
import path from 'path'

const app = express();
app.use(cors());
const __dirname = path.resolve()
app.use(express.json());
dotenv.config();


const PORT = process.env.PORT || 5000;

app.use("/api/products", productRouter);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  })
}

app.listen(PORT, () => {
  try {
    connectDB();
    console.log(`Server started at http://localhost:3000`);
  } catch (err) {
    console.log(`Error server: ${err}`);
    process.exit(1);
  }
});
