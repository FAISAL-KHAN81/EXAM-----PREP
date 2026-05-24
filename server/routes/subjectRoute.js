const express = require("express");
const Subject = require('../models/Subject');

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const result = new Subject(req.body);
    await result.save();
    return res.status(201).json({message: "Subject Added Successfully"});
  } catch (err) {
    console.error("Error creating subject:", err);
    return res.status(500).json({ message: "Server error creating subject" });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await Subject.find();
    return res.json(result);
  } catch (err) {
    console.error("Error fetching subjects:", err);
    return res.status(500).json({ message: "Server error fetching subjects" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Subject.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Subject not found" });
    }
    return res.json({ message: "Subject Deleted Successfully" });
  } catch (err) {
    console.error("Error deleting subject:", err);
    return res.status(500).json({ message: "Server error deleting subject" });
  }
});
  
router.put("/:id", async (req, res) => {
  try {
    const result = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!result) {
      return res.status(404).json({ message: "Subject not found" });
    }
    return res.json({ message: "Subject Updated" });
  } catch (err) {
    console.error("Error updating subject:", err);
    return res.status(500).json({ message: "Server error updating subject" });
  }
});

module.exports = router;
