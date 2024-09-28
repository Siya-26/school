import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Sidebar from './Sidebar';

// Styled-components
const FormContainer = styled.div`
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 1rem;
  min-height: 120px;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #007bff;
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 300px;
  margin-top: 1rem;
  border-radius: 5px;
`;

const CreateEvent = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    start_time: '',
    end_date: '',
    end_time: '',
    location: '',
    capacity: '',
    firstname: '',
    lastname: '',
    email: '',
    poster: null // State to hold the file
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      poster: file,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataImg = new FormData();
    formDataImg.append('image', formData.poster);
    let posterUrl;
    try {
      const response = await axios.post(`${process.env.REACT_APP_STORAGE_URI}/api/storage/upload`, formDataImg, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImageUrl(response.data.imageUrl);
      posterUrl = response.data.imageUrl;
    } catch (error) {
      console.error('Error uploading image', error);
    }

    // Prepare event data
    const { title, description, location, capacity, firstname, lastname, email } = formData;
    const startDateArr = formData.start_date.split("-");
    const startTimeArr = formData.start_time.split(":");
    const endDateArr = formData.end_date.split("-");
    const endTimeArr = formData.end_time.split(":");

    const event = {
      name: title,
      description,
      start_date: new Date(startDateArr[0], startDateArr[1] - 1, startDateArr[2], startTimeArr[0], startTimeArr[1]),
      end_date: new Date(endDateArr[0], endDateArr[1] - 1, endDateArr[2], endTimeArr[0], endTimeArr[1]),
      location,
      poster: posterUrl,
      capacity,
      likes: 0,
      creator: {
        name: firstname,
        surname: lastname,
        email
      }
    };

    // Create the event
    try {
      const createdEvent = await axios.post(`${process.env.REACT_APP_API_URI}/api/emapi/event/create`, event, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      // Notify the creator of the new event
      const notification = {
        userId: email, // or whatever user identifier you have
        message: `Event "${title}" has been successfully created!`,
        eventId: createdEvent.data._id,
        timestamp: new Date(),
      };

      await axios.post(`${process.env.REACT_APP_API_URI}/api/notifications`, notification, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      alert("Event Successfully Created!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='DashboardContainer'>
      <Sidebar />
      <div className='ContentArea'>
        <FormContainer>
          <FormTitle>Create a New Event</FormTitle>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Event Title</Label>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Description</Label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Start Date</Label>
              <Input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Start Time</Label>
              <Input
                type="time"
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>End Date</Label>
              <Input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>End Time</Label>
              <Input
                type="time"
                name="end_time"
                value={formData.end_time}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Location</Label>
              <Input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Capacity</Label>
              <Input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Firstname</Label>
              <Input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Lastname</Label>
              <Input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Email</Label>
              <Input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Poster</Label>
              <Input
                type="file"
                name="poster"
                onChange={handleFileChange}
              />
            </FormGroup>

            <Button type="submit">Create Event</Button>
          </form>

          {formData.poster && <ImagePreview src={URL.createObjectURL(formData.poster)} alt="Selected Preview" />}
        </FormContainer>
      </div>
    </div>
  );
};

export default CreateEvent;
