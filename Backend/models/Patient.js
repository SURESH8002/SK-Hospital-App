// models/Patient.js

const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Patient name is required'],
            trim: true
        },
        age: {
            type: Number,
            required: [true, 'Age is required'],
            min: [0, 'Age must be a positive number']
        },
        gender: {
            type: String,
            required: [true, 'Gender is required'],
            enum: ['Male', 'Female', 'Other'] // Limits to specific values
        }
        // You can add more fields here, e.g., contact info, address, medical history
    },
    {
        timestamps: true // Automatically adds createdAt & updatedAt
    }
);

module.exports = mongoose.model('Patient', patientSchema);
