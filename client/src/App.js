import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import Landing from './components/Landing';
import Dashboard from './Pages/Dashboard/Dashboard';
import CreateEvent from './components/CreateEvent';
import Tickets from './Pages/Tickets/tickets';
import Notifications from './Pages/Nofications/notifications';
import MyEvents from './Pages/MyEvents/myEvents';
import Calendar from './components/EventCalendar';
import Home from './Pages/Home/Home';
import { messaging } from './firebaseConfig'; // Adjust the import based on your firebase configuration
import { getToken } from 'firebase/messaging'; // Ensure you have this imported
import axios from 'axios';

function App() {
  useEffect(() => {
    // Request notification permission
    const requestNotificationPermission = async () => {
      try {
        const currentToken = await getToken(messaging, { vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY });
        if (currentToken) {
          // Store the token in your backend or local storage
          console.log('FCM Token:', currentToken);
    
          // Send the token to the server
          const userId = "USER_ID"; // Replace with the actual user ID from your authentication context
          await fetch("http://localhost:3000/api/notapi/save-token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId, token: currentToken }),
          });
        } else {
          console.log('No registration token available. Request permission to generate one.');
        }
      } catch (error) {
        console.error('An error occurred while retrieving token. ', error);
      }
    };
    

    requestNotificationPermission();
  }, []);

  const saveTokenToDB = async (token) => {
    try {
      // Send the token to your backend API to be stored in the database
      await axios.post(`${process.env.REACT_APP_API_URI}/api/notapi/token`, {
        token,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Optionally handle success response
      console.log('FCM Token saved to database successfully');
    } catch (error) {
      console.error('Error saving token to database', error);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
