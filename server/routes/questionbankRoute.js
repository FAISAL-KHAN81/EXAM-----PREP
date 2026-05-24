const Question = require('../models/Questionbank');
const express = require('express');
const router  = express.Router();

router.post('/', async(req,res)=>{
    try {
        const question = new Question(req.body);
        await question.save();
        return res.status(201).json({message:"Question added Successfully"});
    } catch (err) {
        console.error("Error creating question:", err);
        return res.status(500).json({ message: "Server error creating question" });
    }
});

router.get('/', async(req,res)=>{
    try {
        const question = await Question.find().populate('subject');
        return res.json({data:question});
    } catch (err) {
        console.error("Error fetching questions:", err);
        return res.status(500).json({ message: "Server error fetching questions" });
    }
});

router.delete('/:id',async(req,res)=>{
    try {
        const {id}= req.params;
        const question = await Question.findByIdAndDelete(id);
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        return res.json({message:"Deleted successfully"});
    } catch (err) {
        console.error("Error deleting question:", err);
        return res.status(500).json({ message: "Server error deleting question" });
    }
});

router.put('/:id', async(req,res)=>{
    try {
        const {id} = req.params;
        const question = await Question.findByIdAndUpdate(id, req.body, { new: true });
        if (!question) {
            return res.status(404).json({ message: "Question not found" });
        }
        return res.json({message:"Updated Successfully"});
    } catch (err) {
        console.error("Error updating question:", err);
        return res.status(500).json({ message: "Server error updating question" });
    }
});

module.exports = router;