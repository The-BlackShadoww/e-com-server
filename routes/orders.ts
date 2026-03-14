import express from "express";
import Order from "../models/Order";
import { authenticate } from "../middleware/auth";

const router = express.Router();

// GET /api/orders - Get all orders (admin functionality)
router.get("/", authenticate, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "name price");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// GET /api/orders/:id - Get order by ID
router.get("/:id", authenticate, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("products.product", "name price");
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// GET /api/orders/user/:userId - Get orders by user ID
router.get("/user/:userId", authenticate, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.params.userId })
      .populate("user", "name email")
      .populate("products.product", "name price");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// POST /api/orders - Create a new order
router.post("/", authenticate, async (req, res) => {
  try {
    const {
      user,
      products,
      totalAmount,
      shippingAddress,
      paymentStatus = "pending",
    } = req.body;

    const order = new Order({
      user,
      products,
      totalAmount,
      shippingAddress,
      paymentStatus,
    });
    await order.save();

    // Populate for response
    await order.populate("user", "name email");
    await order.populate("products.product", "name price");

    res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// PUT /api/orders/:id - Update order
router.put("/:id", authenticate, async (req, res) => {
  try {
    const { products, totalAmount, status, shippingAddress, paymentStatus } =
      req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        products,
        totalAmount,
        status,
        shippingAddress,
        paymentStatus,
      },
      { new: true, runValidators: true },
    )
      .populate("user", "name email")
      .populate("products.product", "name price");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order updated successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// PUT /api/orders/:id/status - Update order status
router.put("/:id/status", authenticate, async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    )
      .populate("user", "name email")
      .populate("products.product", "name price");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order status updated successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// DELETE /api/orders/:id - Delete order
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router;
