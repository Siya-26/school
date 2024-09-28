import React from 'react';
import  { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled from 'styled-components';
import Sidebar from './Sidebar';

const localizer = momentLocalizer(moment);

const CalendarContainer = styled.div`
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
  max-width: 1200px;
`;

const EventCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect( () => {
    // Fetch events from API
    const fetchCalendarEvents = async () => {
      await fetch(`${process.env.REACT_APP_API_URI}/api/emapi/events`)
      .then(response => response.json())
      .then(data => {
        const calendarEvents = [];
        for(let i = 0; i < Object.keys(data).length; i++){
          const calendarEvent = {
            title: data[i].name,
            start: new Date(data[i].start_date),
            end: new Date(data[i].end_date),
          }
          //console.log(`title: ${title}, start: ${start}, end: ${end}`);
          calendarEvents.push(calendarEvent);
        }
        setEvents(calendarEvents);
      })
      .catch(error => console.error('Error fetching events:', error));
    }
    fetchCalendarEvents();
  }, []);

  return (
    <div className='DashboardContainer'>
        <Sidebar/>
        <div className='ContentArea'>
        <CalendarContainer>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        defaultView="month"
        views={['month', 'week', 'day', 'agenda']}
        step={60}
        showMultiDayTimes
        selectable
        popup
        onSelectEvent={event => alert(event.title)}
        onSelectSlot={slotInfo => alert(`Selected slot: ${slotInfo.start} to ${slotInfo.end}`)}
      />
    </CalendarContainer>
        </div>

    </div>
  )

};

export default EventCalendar;
