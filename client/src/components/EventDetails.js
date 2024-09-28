import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const EventDetailsContainer = styled.div`
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
  max-width: 900px;
`;

const EventHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const DateTime = styled.div`
  font-size: 1rem;
  color: #666;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #444;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const Location = styled.div`
  font-size: 1rem;
  color: #666;
  margin-bottom: 2rem;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    background-color: #f57c00;
    color: #fff;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    margin-left: 1rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ef6c00;
    }
  }
`;

const EventDetails = () => {
  const { id } = useParams();  // Fetch event ID from URL
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Fetch event details from API using the event ID
    fetch(`/api/events/${id}`)
      .then(response => response.json())
      .then(data => setEvent(data))
      .catch(error => console.error('Error fetching event details:', error));
  }, [id]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <EventDetailsContainer>
      <EventHeader>
        <Title>{event.title}</Title>
        <DateTime>{new Date(event.date).toLocaleString()}</DateTime>
      </EventHeader>
      <Description>{event.description}</Description>
      <Location><strong>Location:</strong> {event.location}</Location>
      <Actions>
        <button>Edit Event</button>
        <button>Delete Event</button>
      </Actions>
    </EventDetailsContainer>
  );
};

export default EventDetails;
