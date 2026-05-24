const express = require("express");
const Session = require('../models/Session');

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const result = new Session(req.body);
    await result.save();
    return res.status(201).json({message: "Session Added Successfully"});
  } catch (err) {
    console.error("Error creating session:", err);
    return res.status(500).json({ message: "Server error creating session" });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await Session.find();
    return res.json(result);
  } catch (err) {
    console.error("Error fetching sessions:", err);
    return res.status(500).json({ message: "Server error fetching sessions" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Session.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Session not found" });
    }
    return res.json({ message: "Session Deleted Successfully" });
  } catch (err) {
    console.error("Error deleting session:", err);
    return res.status(500).json({ message: "Server error deleting session" });
  }
});
  
router.put("/:id", async (req, res) => {
  try {
    const result = await Session.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!result) {
      return res.status(404).json({ message: "Session not found" });
    }
    return res.json({ message: "Session Updated" });
  } catch (err) {
    console.error("Error updating session:", err);
    return res.status(500).json({ message: "Server error updating session" });
  }
});

module.exports = router;
