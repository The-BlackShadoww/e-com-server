import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/database";
import userRoutes from "./routes/users";
import categoryRoutes from "./routes/categories";
import productRoutes from "./routes/products";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "E-commerce Backend API" });
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
