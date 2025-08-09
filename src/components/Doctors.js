// src/components/Doctors.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorCard from './DoctorCard';
import './DoctorCard.css';

const Doctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [newDoctor, setNewDoctor] = useState({ name: '', specialty: '' });
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    // Fetch doctors from backend
    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/doctors');
            setDoctors(data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    // Add doctor
    const handleAddDoctor = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                'http://localhost:5000/doctors/add',
                newDoctor
            );
            setDoctors([...doctors, data]);
            setNewDoctor({ name: '', specialty: '' });
        } catch (error) {
            console.error('Error adding doctor:', error);
        }
    };

    // Update doctor
    const handleUpdateDoctor = async (id, e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `http://localhost:5000/doctors/update/${id}`,
                selectedDoctor
            );
            setDoctors(
                doctors.map((doc) => (doc._id === id ? data : doc))
            );
            setSelectedDoctor(null);
            setIsEditMode(false);
        } catch (error) {
            console.error('Error updating doctor:', error);
        }
    };

    // Delete doctor
    const handleDeleteDoctor = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/doctors/delete/${id}`);
            setDoctors(doctors.filter((doc) => doc._id !== id));
        } catch (error) {
            console.error('Error deleting doctor:', error);
        }
    };

    // Edit doctor
    const handleEditDoctor = (doctor) => {
        setSelectedDoctor(doctor);
        setIsEditMode(true);
    };

    return (
        <div className="flex-row" style={{ width: '100%' }}>
            <div className="form-sections">
                <h4>{isEditMode ? 'Edit Doctor' : 'Add New Doctor'}</h4>
                <form
                    onSubmit={
                        isEditMode
                            ? (e) => handleUpdateDoctor(selectedDoctor._id, e)
                            : handleAddDoctor
                    }
                >
                    <label>Name:</label>
                    <input
                        type="text"
                        value={
                            isEditMode
                                ? selectedDoctor?.name || ''
                                : newDoctor.name
                        }
                        onChange={(e) =>
                            isEditMode
                                ? setSelectedDoctor({
                                      ...selectedDoctor,
                                      name: e.target.value,
                                  })
                                : setNewDoctor({
                                      ...newDoctor,
                                      name: e.target.value,
                                  })
                        }
                        required
                    />
                    <label>Specialty:</label>
                    <input
                        type="text"
                        value={
                            isEditMode
                                ? selectedDoctor?.specialty || ''
                                : newDoctor.specialty
                        }
                        onChange={(e) =>
                            isEditMode
                                ? setSelectedDoctor({
                                      ...selectedDoctor,
                                      specialty: e.target.value,
                                  })
                                : setNewDoctor({
                                      ...newDoctor,
                                      specialty: e.target.value,
                                  })
                        }
                        required
                    />
                    <button type="submit">
                        {isEditMode ? 'Update Doctor' : 'Add Doctor'}
                    </button>
                </form>
            </div>

            <div className="doctors-section">
                <h3>Doctors ({doctors.length})</h3>
                <div className="doctor-list">
                    {doctors.map((doctor) => (
                        <DoctorCard
                            key={doctor._id}
                            doctor={doctor}
                            onEdit={handleEditDoctor}
                            onDelete={handleDeleteDoctor}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Doctors;
