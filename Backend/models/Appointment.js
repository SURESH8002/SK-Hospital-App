// models/Appointment.js

const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
    {
        patientName: { 
            type: String, 
            required: [true, 'Patient name is required'], 
            trim: true 
        },
        doctorName: { 
            type: String, 
            required: [true, 'Doctor name is required'], 
            trim: true 
        },
        date: { 
            type: Date, 
            required: [true, 'Appointment date is required'] 
        }
        // You can add more fields here, e.g., reason, notes, status
    },
    {
        timestamps: true // Adds createdAt and updatedAt fields automatically
    }
);

module.exports = mongoose.model('Appointment', appointmentSchema);
