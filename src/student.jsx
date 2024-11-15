/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './index.css';

const Student = () => {
    // Event Data Structure
    const [events, setEvents] = useState([
        {
            id: 1,
            name: 'Tech Innovation Hackathon',
            category: 'hackathon',
            interest: 'tech',
            date: '2023-11-15',
            time: '09:00 AM',
            location: 'Tech Hub, Campus Center',
            organizer: 'Computer Science Department',
            description: 'Annual hackathon for innovative tech solutions',
            registrationLink: '/register/hackathon',
            totalRegistrations: 0,
            registeredUsers: []
        },
        {
            id: 2,
            name: 'Cultural Fusion Festival',
            category: 'cultural',
            interest: 'culture',
            date: '2023-12-10',
            time: '06:00 PM',
            location: 'Main Auditorium',
            organizer: 'Cultural Club',
            description: 'Celebrating diversity through performances',
            registrationLink: '/register/cultural-fest',
            totalRegistrations: 0,
            registeredUsers: []
        }
    ]);

    // State Management
    const [filteredEvents, setFilteredEvents] = useState(events);
    const [savedEvents, setSavedEvents] = useState([]);
    const [filters, setFilters] = useState({
        category: '',
        interest: '',
        dateRange: 'upcoming',
        searchTerm: ''
    });

    // Calendar State
    const [selectedDate, setSelectedDate] = useState(new Date());

    

    // Event Registration
    const registerForEvent = (eventId) => {
        const updatedEvents = events.map(event => {
            if (event.id === eventId) {
                return {
                    ...event,
                    totalRegistrations: event.totalRegistrations + 1,
                    registeredUsers: [...event.registeredUsers, 'current_user_id']
                };
            }
            return event;
        });

        setEvents(updatedEvents);
    };

    // Save Event
    const saveEvent = (event) => {
        if (!savedEvents.find(savedEvent => savedEvent.id === event.id)) {
            setSavedEvents([...savedEvents, event]);
        }
    };

    // Set Reminder
    const setReminder = (event) => {
        // Implement reminder logic (email/push notification)
        alert(`Reminder set for ${event.name} on ${event.date}`);
    };

    useEffect(() => {
        let result = events;
    
        // Category Filter
        if (filters.category) {
            result = result.filter(event => event.category === filters.category);
        }
    
        // Interest Filter
        if (filters.interest) {
            result = result.filter(event => event.interest === filters.interest);
        }
    
        // Date Range Filter
        const currentDate = moment();
        switch (filters.dateRange) {
            case 'upcoming':
                result = result.filter(event => moment(event.date).isAfter(currentDate));
                break;
            case 'past':
                result = result.filter(event => moment(event.date).isBefore(currentDate));
                break;
            default:
                break;
        }
    
        // Search Filter
        if (filters.searchTerm) {
            result = result.filter(event => 
                event.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                event.organizer.toLowerCase().includes(filters.searchTerm.toLowerCase())
            );
        }
    
        setFilteredEvents(result);
    }, [events, filters]);
    

    return (
        <div className="student-events-page">
            <h1>College Events Dashboard</h1>

            {/* Search and Filter Section */}
            <div className="filters-container">
                <input 
                    type="text" 
                    placeholder="Search events..." 
                    onChange={(e) => setFilters({...filters, searchTerm: e.target.value})}
                />
                
                <select 
                    onChange={(e) => setFilters({...filters, category: e.target.value})}
                >
                    <option value="">All Categories</option>
                    <option value="hackathon">Hackathons</option>
                    <option value="cultural">Cultural Events</option>
                    <option value="sports">Sports</option>
                    <option value="workshop">Workshops</option>
                </select>

                <select 
                    onChange={(e) => setFilters({...filters, interest: e.target.value})}
                >
                    <option value="">All Interests</option>
                    <option value="tech">Tech</option>
                    <option value="culture">Culture</option>
                    <option value="sports">Sports</option>
                </select>

                <select 
                    onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                >
                    <option value="upcoming">Upcoming Events</option>
                    <option value="past">Past Events</option>
                </select>
            </div>

            {/* Calendar View */}
            <Calendar 
                onChange={setSelectedDate} 
                value={selectedDate}
            />

            {/* Events List */}
            <div className="events-list">
                {filteredEvents.map(event => (
                    <div key={event.id} className="event-card">
                        <h2>{event.name}</h2>
                        <p>{event.description}</p>
                        <p>Date: {event.date} | Time: {event.time}</p>
                        <p>Location: {event.location}</p>
                        <p>Organizer: {event.organizer}</p>
                        
                        <div className="event-actions">
                            <button onClick={() => registerForEvent(event.id)}>
                                Register ({event.totalRegistrations})
                            </button>
                            <button onClick={() => saveEvent(event)}>Save Event</button>
                            <button onClick={() => setReminder(event)}>Set Reminder</button>
                            <Link to={`/event/${event.id}`}>View Details</Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Saved Events Section */}
            <div className="saved-events">
                <h2>Saved Events</h2>
                {savedEvents.map(event => (
                    <div key={event.id}>
                        {event.name} - {event.date}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Student;