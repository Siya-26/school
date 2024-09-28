import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import styled from 'styled-components';
import axios from 'axios';

// Styled-components for better UI
const NotificationContainer = styled.div`
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const NotificationItem = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 1rem 0;
`;

const NotificationMessage = styled.p`
  margin: 0;
  color: #333;
`;

const NotificationDate = styled.span`
  font-size: 0.8rem;
  color: #999;
`;

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URI}/api/notifications`);
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications', error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className='DashboardContainer'>
      <Sidebar />
      <div className='ContentArea'>
        <NotificationContainer>
          <h2>Your Notifications</h2>
          {notifications.length === 0 ? (
            <p>No notifications available.</p>
          ) : (
            notifications.map((notification) => (
              <NotificationItem key={notification._id}>
                <NotificationMessage>{notification.message}</NotificationMessage>
                <NotificationDate>{new Date(notification.timestamp).toLocaleString()}</NotificationDate>
              </NotificationItem>
            ))
          )}
        </NotificationContainer>
      </div>
    </div>
  );
}

export default Notifications;
