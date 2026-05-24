const Examinee = require('../models/Examinee');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { email } = req.body;
        const ex = await Examinee.findOne({ email: email });
        if (ex) {
            return res.status(400).json({ message: "Details already exists" });
        }

        const user = new Examinee(req.body);
        await user.save();
        return res.status(201).json({ message: "Registered Successfully" });
    } catch (err) {
        console.error("Error registering examinee:", err);
        return res.status(500).json({ message: "Server error during registration" });
    }
});

router.get('/', async (req, res) => {
    try {
        const user = await Examinee.find().populate('session');
        return res.json(user);
    } catch (err) {
        console.error("Error fetching examinees:", err);
        return res.status(500).json({ message: "Server error fetching examinees" });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Examinee.findByIdAndUpdate(id, req.body, { new: true });
        if (!user) {
            return res.status(404).json({ message: "Examinee not found" });
        }
        return res.json({ message: "Updated Successfully" });
    } catch (err) {
        console.error("Error updating examinee:", err);
        return res.status(500).json({ message: "Server error updating examinee" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Examinee.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "Examinee not found" });
        }
        return res.json({ message: "Deleted Successfully" });
    } catch (err) {
        console.error("Error deleting examinee:", err);
        return res.status(500).json({ message: "Server error deleting examinee" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Examinee.findById(id).populate('session');
        if (!user) {
            return res.status(404).json({ message: "Examinee not found" });
        }
        return res.json(user);
    } catch (err) {
        console.error("Error fetching examinee details:", err);
        return res.status(500).json({ message: "Server error fetching examinee details" });
    }
});

router.post('/login', async(req, res) => {
    try {
        const {email, password} = req.body;

        const user = await Examinee.findOne({email: email})
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }

        if(user.password == password){
            return res.status(200).json({
                message: "Login Successfully", 
                user: {
                    email: user.email,
                    id: user._id,
                    role: "user"
                }
            });
        } else {
            return res.status(401).json({ message: "Email or Password not match" });
        }
    } catch (err) {
        console.error("Error on examinee login:", err);
        return res.status(500).json({ message: "Server error during login" });
    }
});

router.put('/change/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { op, np, cnp } = req.body;

        if (!np || !cnp) {
            return res.status(400).json({ message: "New password fields are required" });
        }

        if (np !== cnp) {
            return res.status(400).json({ message: "New passwords do not match" });
        }

        const user = await Examinee.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Details not matched" });
        }

        if (user.password !== op) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        user.password = np;
        await user.save();
        return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating examinee password:", error);
        return res.status(500).json({ message: "Server error while changing password" });
    }
});

module.exports = router;