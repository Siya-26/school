import React from 'react';
import styled from 'styled-components';
import Sidebar from '../../components/Sidebar';
import EventCalendar from '../../components/EventCalendar';
import UserProfile from '../../components/UserProfile';
import { Routes, Route } from 'react-router-dom';
import EventDetails from '../../components/EventDetails';
import EditProfile from '../../components/EditProfile';
import CreateEvent from '../../components/CreateEvent';
import Logout from '../../components/Logout';

const DashboardContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const ContentArea = styled.div`
  flex-grow: 1;
  padding: 2rem;
  overflow-y: auto;
`;

const Dashboard = () => {
  return (
    <DashboardContainer>
      <Sidebar />
      <ContentArea>
        <Routes>
          <Route path="/" element={<EventCalendar />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/logout" element={<Logout/>} />
          {/* Add other routes as needed */}
        </Routes>
      </ContentArea>
    </DashboardContainer>
  );
};

export default Dashboard;
  
 