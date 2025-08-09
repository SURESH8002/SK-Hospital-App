// routes/doctors.js

const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');

// Get all doctors
router.get('/', async (req, res) => {
    try {
        const doctors = await Doctor.find();
        res.json(doctors);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Add a new doctor
router.post('/add', async (req, res) => {
    try {
        const { name, specialty } = req.body;

        if (!name || !specialty) {
            return res.status(400).json({ error: 'Name and specialty are required.' });
        }

        const newDoctor = new Doctor({ name, specialty });
        const savedDoctor = await newDoctor.save();

        res.status(201).json(savedDoctor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update doctor
router.put('/update/:id', async (req, res) => {
    try {
        const { name, specialty } = req.body;

        const updatedDoctor = await Doctor.findByIdAndUpdate(
            req.params.id,
            { name, specialty },
            { new: true, runValidators: true }
        );

        if (!updatedDoctor) {
            return res.status(404).json({ error: 'Doctor not found.' });
        }

        res.json(updatedDoctor);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete doctor
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);

        if (!deletedDoctor) {
            return res.status(404).json({ error: 'Doctor not found.' });
        }

        res.json({ message: 'Doctor deleted successfully.' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
