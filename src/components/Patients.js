// src/components/Patients.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PatientCard.css';
import PatientCard from './PatientCard';

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [newPatient, setNewPatient] = useState({ name: '', age: '', gender: '' });
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    // Fetch all patients
    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/patients');
            setPatients(data);
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    };

    // Add patient
    const handleAddPatient = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/patients/add', newPatient);
            setPatients([...patients, data]);
            setNewPatient({ name: '', age: '', gender: '' });
        } catch (error) {
            console.error('Error adding patient:', error);
        }
    };

    // Update patient
    const handleUpdatePatient = async (id, e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `http://localhost:5000/patients/update/${id}`,
                selectedPatient
            );
            setPatients(patients.map(p => (p._id === id ? data : p)));
            setSelectedPatient(null);
            setIsEditMode(false);
        } catch (error) {
            console.error('Error updating patient:', error);
        }
    };

    // Delete patient
    const handleDeletePatient = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/patients/delete/${id}`);
            setPatients(patients.filter(p => p._id !== id));
        } catch (error) {
            console.error('Error deleting patient:', error);
        }
    };

    // Switch to edit mode
    const handleEditPatient = (patient) => {
        setSelectedPatient(patient);
        setIsEditMode(true);
    };

    return (
        <div className="patient-main">
            {/* Form Section */}
            <div className="form-sections">
                <h4>{isEditMode ? 'Edit Patient' : 'Add New Patient'}</h4>
                <form
                    onSubmit={
                        isEditMode
                            ? (e) => handleUpdatePatient(selectedPatient._id, e)
                            : handleAddPatient
                    }
                >
                    <label>Name:</label>
                    <input
                        type="text"
                        value={isEditMode ? selectedPatient.name : newPatient.name}
                        onChange={(e) =>
                            isEditMode
                                ? setSelectedPatient({ ...selectedPatient, name: e.target.value })
                                : setNewPatient({ ...newPatient, name: e.target.value })
                        }
                    />

                    <label>Age:</label>
                    <input
                        type="number"
                        value={isEditMode ? selectedPatient.age : newPatient.age}
                        onChange={(e) =>
                            isEditMode
                                ? setSelectedPatient({ ...selectedPatient, age: e.target.value })
                                : setNewPatient({ ...newPatient, age: e.target.value })
                        }
                    />

                    <label>Gender:</label>
                    <input
                        type="text"
                        value={isEditMode ? selectedPatient.gender : newPatient.gender}
                        onChange={(e) =>
                            isEditMode
                                ? setSelectedPatient({ ...selectedPatient, gender: e.target.value })
                                : setNewPatient({ ...newPatient, gender: e.target.value })
                        }
                    />

                    <button type="submit">
                        {isEditMode ? 'Update Patient' : 'Add Patient'}
                    </button>
                </form>
            </div>

            {/* Patient List Section */}
            <div className="patients-section">
                <h3>Patients ({patients.length})</h3>
                <div className="patient-list">
                    {patients.map((patient) => (
                        <PatientCard
                            key={patient._id}
                            patient={patient}
                            onEdit={handleEditPatient}
                            onDelete={handleDeletePatient}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Patients;
