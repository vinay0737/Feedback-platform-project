const express = require("express");
const Form = require("../models/Form");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

// Create a form (admin only)
router.post("/create", protect, async (req, res) => {
  try {
    const { title, questions } = req.body;

    const form = await Form.create({
      title,
      questions,
      adminId: req.admin._id,
    });

    res.status(201).json(form);
  } catch (err) {
    console.error("❌ Error creating form:", err.message);
    res.status(500).json({ message: "Failed to create form" });
  }
});

// Get form by ID (public view)
router.get("/:id", async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    res.json(form);
  } catch {
    res.status(404).json({ message: "Form not found" });
  }
});

// Get all forms by admin (dashboard view)
router.get("/admin/all", protect, async (req, res) => {
  try {
    const forms = await Form.find({ adminId: req.admin._id });
    res.json(forms);
  } catch {
    res.status(500).json({ message: "Error fetching forms" });
  }
});

module.exports = router;

