import React, { useState, useEffect } from 'react';
import PatientCard from './PatientCard';
import '../components/PatientCard.css';

const Patients = () => {
    const [patients, setPatients] = useState([]);
    const [formData, setFormData] = useState({ name: '', age: '', gender: '' });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetch('/api/patients')
            .then(res => res.json())
            .then(data => setPatients(data))
            .catch(err => console.error('Error fetching patients:', err));
    }, []);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const method = editId ? 'PUT' : 'POST';
        const url = editId ? `/api/patients/${editId}` : '/api/patients';

        fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(() => {
                setFormData({ name: '', age: '', gender: '' });
                setEditId(null);
                return fetch('/api/patients').then(res => res.json());
            })
            .then(data => setPatients(data))
            .catch(err => console.error('Error saving patient:', err));
    };

    const handleEdit = patient => {
        setFormData({
            name: patient.name,
            age: patient.age,
            gender: patient.gender
        });
        setEditId(patient._id);
    };

    const handleDelete = id => {
        fetch(`/api/patients/${id}`, { method: 'DELETE' })
            .then(() => setPatients(prev => prev.filter(p => p._id !== id)))
            .catch(err => console.error('Error deleting patient:', err));
    };

    return (
        <div className="patient-main">
            <div className="form-sections">
                <h4>{editId ? 'Edit Patient' : 'Add Patient'}</h4>
                <form onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <label>Age</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                    <label>Gender</label>
                    <input
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">
                        {editId ? 'Update' : 'Add'}
                    </button>
                </form>
            </div>

            <div className="patients-section">
                {patients.map(patient => (
                    <PatientCard
                        key={patient._id}
                        patient={patient}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default Patients;
