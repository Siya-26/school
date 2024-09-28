import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
  max-width: 900px;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 2rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const UserEmail = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-top: 2rem;
  margin-bottom: 1rem;
`;

const EventList = styled.ul`
  list-style: none;
  padding: 0;
`;

const EventItem = styled.li`
  background-color: #f7f7f7;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1rem;
`;

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch user profile data
    fetch('/api/user')
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user data:', error));

    // Fetch events created or registered by the user
    fetch('/api/user/events')
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching user events:', error));
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <ProfileContainer>
      <ProfileHeader>
        <Avatar src={user.profilePicture} alt={`${user.name}'s Avatar`} />
        <UserInfo>
          <UserName>{user.name}</UserName>
          <UserEmail>{user.email}</UserEmail>
        </UserInfo>
      </ProfileHeader>

      <SectionTitle>My Events</SectionTitle>
      <EventList>
        {events.map(event => (
          <EventItem key={event.id}>
            <h3>{event.title}</h3>
            <p>{new Date(event.date).toLocaleDateString()}</p>
          </EventItem>
        ))}
      </EventList>
    </ProfileContainer>
  );
};

export default UserProfile;
