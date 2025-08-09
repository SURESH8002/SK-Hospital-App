// models/Doctor.js

const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Doctor name is required'],
            trim: true
        },
        specialty: {
            type: String,
            required: [true, 'Specialty is required'],
            trim: true
        }
        // You can add more fields here, e.g., phone, email, availability
    },
    {
        timestamps: true // Automatically adds createdAt & updatedAt
    }
);

module.exports = mongoose.model('Doctor', doctorSchema);
