import express from "express";
import { Request, Response } from "express";
import Cart from "../models/Cart";

const router = express.Router();

// POST /api/cart - Create a new cart for a user
router.post("/", async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const existingCart = await Cart.findOne({ userId });
    if (existingCart) {
      return res.status(400).json({ message: "Cart already exists" });
    }

    const cart = new Cart({ userId });
    await cart.save();

    res.status(201).json({ message: "Cart created successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
/*******  0033e053-f1a0-464c-829c-b4cfc8a7bb86  *******/

// GET /api/cart - Get cart by user ID
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.findOne({ userId }).populate(
      "products",
      "name price imageUrl",
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});
