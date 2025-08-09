// routes/appointments.js

const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// Get all appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.json(appointments);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Add a new appointment
router.post('/add', async (req, res) => {
    try {
        const { patientName, doctorName, date } = req.body;
        if (!patientName || !doctorName || !date) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const newAppointment = new Appointment({ id: add.length +1,patientName, doctorName, date });
        const savedAppointment = await newAppointment.save();

        res.status(201).json(savedAppointment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update appointment
router.put('/update/:id', async (req, res) => {
    try {
        const { patientName, doctorName, date } = req.body;

        const updatedAppointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            { patientName, doctorName, date },
            { new: true, runValidators: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({ error: 'Appointment not found.' });
        }

        res.json(updatedAppointment);
    } catch (err) {
        console.error('PUT error:', error);
        res.status(400).json({ error: err.message });
    }
});

// Delete appointment
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);

        if (!deletedAppointment) {
            return res.status(404).json({ error: 'Appointment not found.' });
        }

        res.json({ message: 'Appointment deleted successfully.' });
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
