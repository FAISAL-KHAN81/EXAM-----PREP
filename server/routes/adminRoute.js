const Admin = require('../models/Admin');
const express = require("express");

const router = express.Router();

router.get("/", async(req, res) => {
    return res.json("Api Called")
});

router.post('/', async(req, res) => {
    try {
        const { email } = req.body;
        const exists = await Admin.findOne({ email });
        if (exists) {
            return res.status(400).json({ message: "Admin details already exist" });
        }
        const reg = new Admin(req.body);
        await reg.save();
        return res.status(201).json({ message: "Admin Registered Successfully" });
    } catch (err) {
        console.error("Error registering admin:", err);
        return res.status(500).json({ message: "Server error during registration" });
    }
});

router.post('/login', async(req, res) => {
    try {
        const {email, password} = req.body;

        const admin = await Admin.findOne({email: email})
        if(!admin){
            return res.status(400).json({ message: "Admin not found" });
        }

        if(admin.password === password){
            return res.status(200).json({
                message: "Login Successfully", 
                admin: {
                    email: admin.email,
                    id: admin._id,
                    role: "admin"
                }
            });
        } else {
            return res.status(401).json({ message: "Email or Password not match" });
        }
    } catch (err) {
        console.error("Error on admin login:", err);
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

        const user = await Admin.findById(id);
        if (!user) {
            return res.status(404).json({ message: "Admin not found" });
        }

        if (user.password !== op) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        user.password = np;
        await user.save();
        return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error updating admin password:", error);
        return res.status(500).json({ message: "Server error while changing password" });
    }
});
module.exports = router;