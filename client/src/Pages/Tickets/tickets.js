import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import styled from 'styled-components';
import axios from 'axios';

// Styled-components for the ticket purchase button
const TicketContainer = styled.div`
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  padding: 1rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

function Tickets() {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      // Here you would include the logic to purchase a ticket
      // For example, send a request to your API
      const response = await axios.post(`${process.env.REACT_APP_API_URI}/api/tickets/buy`, {
        // Include ticket purchase details
      });

      // After successful purchase, trigger notification
      await triggerNotification(`Ticket successfully purchased for event: ${response.data.eventName}`);

      alert("Ticket successfully purchased!");
    } catch (error) {
      console.error('Error purchasing ticket', error);
    } finally {
      setLoading(false);
    }
  };

  const triggerNotification = async (message) => {
    try {
      const notification = {
        message,
        timestamp: new Date(),
      };

      await axios.post(`${process.env.REACT_APP_API_URI}/api/notifications`, notification, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Error storing notification', error);
    }
  };

  return (
    <div className='DashboardContainer'>
      <Sidebar />
      <div className='ContentArea'>
        <TicketContainer>
          <h2>Your Tickets</h2>
          <p>Click the button below to purchase a ticket for an event.</p>
          <Button onClick={handlePurchase} disabled={loading}>
            {loading ? 'Processing...' : 'Buy Ticket'}
          </Button>
        </TicketContainer>
      </div>
    </div>
  );
}

export default Tickets;
