import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppointmentCard from './Appointmentcard.js'; // fixed filename case
import './AppointmentCard.css';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [newAppointment, setNewAppointment] = useState({
        patientName: '',
        doctorName: '',
        date: ''
    });
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/appointments');
            setAppointments(data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const handleAddAppointment = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/appointments/add', newAppointment);
            setAppointments([...appointments, data]);
            setNewAppointment({ patientName: '', doctorName: '', date: '' });
        } catch (error) {
            console.error('Error adding appointment:', error);
        }
    };

    const handleUpdateAppointment = async (id, e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(
                `http://localhost:5000/appointments/update/${id}`,
                selectedAppointment
            );
            setAppointments(appointments.map((appt) => (appt._id === id ? data : appt)));
            setSelectedAppointment(null);
            setIsEditMode(false);
        } catch (error) {
            console.error('Error updating appointment:', error);
        }
    };

    const handleDeleteAppointment = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/appointments/delete/${id}`);
            setAppointments(appointments.filter((appt) => appt._id !== id));
        } catch (error) {
            console.error('Error deleting appointment:', error);
        }
    };

    const handleEditAppointment = (appointment) => {
        setSelectedAppointment(appointment);
        setIsEditMode(true);
    };

    const handleChange = (field, value) => {
        if (isEditMode) {
            setSelectedAppointment({ ...selectedAppointment, [field]: value });
        } else {
            setNewAppointment({ ...newAppointment, [field]: value });
        }
    };

    const activeForm = isEditMode ? selectedAppointment : newAppointment;

    return (
        <div className="flex-row" style={{ width: '100%' }}>
            <div className="flex-column">
                <div className="add-form">
                    <h4>{isEditMode ? 'Edit Appointment' : 'Add New Appointment'}</h4>
                    <form
                        className="appointment-form"
                        onSubmit={
                            isEditMode
                                ? (e) => handleUpdateAppointment(selectedAppointment._id, e)
                                : handleAddAppointment
                        }
                    >
                        <label>Patient Name:</label>
                        <input
                            type="text"
                            value={activeForm?.patientName || ''}
                            onChange={(e) => handleChange('patientName', e.target.value)}
                        />
                        <label>Doctor Name:</label>
                        <input
                            type="text"
                            value={activeForm?.doctorName || ''}
                            onChange={(e) => handleChange('doctorName', e.target.value)}
                        />
                        <label>Date:</label>
                        <input
                            type="date"
                            value={activeForm?.date ? activeForm.date.split('T')[0] : ''}
                            onChange={(e) => handleChange('date', e.target.value)}
                        />
                        <button type="submit">
                            {isEditMode ? 'Update Appointment' : 'Add Appointment'}
                        </button>
                    </form>
                </div>
            </div>

            <div className="appointments">
                <h3>Appointments ({appointments.length})</h3>
                <div className="appointment-list">
                    {appointments.map((appointment) => (
                        <AppointmentCard
                            key={appointment._id}
                            appointment={appointment}
                            onEdit={handleEditAppointment}
                            onDelete={handleDeleteAppointment}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Appointments;
