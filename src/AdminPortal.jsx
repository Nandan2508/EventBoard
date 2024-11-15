/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './AdminPortal.css';

const AdminPortal = ({ addEvent }) => {
    const [newEvent, setNewEvent] = useState({
        id: '',
        name: '',
        category: '',
        interest: '',
        date: '',
        time: '',
        location: '',
        organizer: '',
        description: '',
        registrationLink: '',
        totalRegistrations: 0,
        registeredUsers: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewEvent({ ...newEvent, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Add validation if needed
        if (!newEvent.name || !newEvent.date || !newEvent.time) {
            alert('Please fill in all required fields.');
            return;
        }

        // Generate a unique ID for the event
        const eventWithId = { ...newEvent, id: Date.now() };
        addEvent(eventWithId);

        // Clear the form
        setNewEvent({
            id: '',
            name: '',
            category: '',
            interest: '',
            date: '',
            time: '',
            location: '',
            organizer: '',
            description: '',
            registrationLink: '',
            totalRegistrations: 0,
            registeredUsers: []
        });
        alert('Event added successfully!');
    };

    return (
        <div className="admin-portal">
            <h1>Admin Portal</h1>
            <form onSubmit={handleSubmit} className="admin-form">
                <input
                    type="text"
                    name="name"
                    placeholder="Event Name"
                    value={newEvent.name}
                    onChange={handleChange}
                    required
                />
                <select
                    name="category"
                    value={newEvent.category}
                    onChange={handleChange}
                >
                    <option value="">Select Category</option>
                    <option value="hackathon">Hackathon</option>
                    <option value="cultural">Cultural</option>
                    <option value="sports">Sports</option>
                    <option value="workshop">Workshop</option>
                </select>
                <select
                    name="interest"
                    value={newEvent.interest}
                    onChange={handleChange}
                >
                    <option value="">Select Interest</option>
                    <option value="tech">Tech</option>
                    <option value="culture">Culture</option>
                    <option value="sports">Sports</option>
                </select>
                <input
                    type="date"
                    name="date"
                    value={newEvent.date}
                    onChange={handleChange}
                    required
                />
                <input
                    type="time"
                    name="time"
                    value={newEvent.time}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={newEvent.location}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="organizer"
                    placeholder="Organizer"
                    value={newEvent.organizer}
                    onChange={handleChange}
                />
                <textarea
                    name="description"
                    placeholder="Event Description"
                    value={newEvent.description}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="registrationLink"
                    placeholder="Registration Link"
                    value={newEvent.registrationLink}
                    onChange={handleChange}
                />
                <button type="submit">Add Event</button>
            </form>
        </div>
    );
};

export default AdminPortal;
