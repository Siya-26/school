import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate, NavLink } from 'react-router-dom';
import profilePic from '../../src/images/wits.png'; 
import { FaHome, FaCalendarAlt, FaTicketAlt, FaBell, FaImages } from 'react-icons/fa';

const Sidebar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {

    navigate('/logout'); 
  };

  return (
    <div className="sidebar">

  <div className="profile-section">
    <img src={profilePic} alt="Profile" className="profile-image" />
    <h3 className="profile-name">App Name</h3>
  </div>
  <nav>
    <NavLink to="/home" className="nav-link">
      <FaHome />
      <span>Home</span>
    </NavLink>
    <NavLink to="/create-event" className="nav-link">
      <FaCalendarAlt />
      <span>Create Event</span>
    </NavLink>
    <NavLink to="/my-events" className="nav-link">
      <FaCalendarAlt />
      <span>My Events</span>
    </NavLink>
    <NavLink to="/calendar" className="nav-link">
      <FaCalendarAlt />
      <span>Calendar</span>
    </NavLink>
    <NavLink to="/tickets" className="nav-link">
      <FaTicketAlt />
      <span>Tickets</span>
    </NavLink>
    <NavLink to="/notifications" className="nav-link">
      <FaBell />
      <span>Notifications</span>
    </NavLink>
  </nav>
  <button className="logout-button" onClick={handleLogout}>
    Logout
  </button>
  </div>
  );
};

export default Sidebar;