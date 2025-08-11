// src/components/DoctorCard.js
import React from 'react';

const DoctorCard = ({ doctor = {}, onEdit, onDelete }) => {
    return (
        <div className="doctor-card">
            <p>
                <span>Name: </span>{doctor.name || 'N/A'}
            </p>
            <p>
                <span>Specialty: </span>{doctor.specialty || 'N/A'}
            </p>
            <div className="btn-container">
                <button
                    className="edit-btn"
                    onClick={() => onEdit(doctor)}
                >
                    Edit
                </button>
                <button
                    className="delete-btn"
                    onClick={() => onDelete(doctor._id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DoctorCard;

