const express = require('express');
const mongoose = require('mongoose');
const Notification = require('../models/notifications.models'); // Adjust the path based on your structure
const User = require('../models/user.models');
const messaging = require('../firebase/firebase.config'); // Adjust the path based on your structure
const app = express();
require('dotenv').config();

// GLOBAL VARIABLES
const database = process.env.MONGO_DATABASE_CONNECT;
const PORT = process.env.PORT || 3000;
const schemaFields = ["name", "description", "date", "duration", "location", "poster", "capacity", "creator"];

// Middleware
app.use(express.json());

// Create a notification and send it
app.post('/api/notapi/notification/create', async (req, res) => {
  const { title, body, userToken } = req.body;

  // Create notification in MongoDB
  try {
    const notification = await Notification.create({ title, body, userToken });

    // Send notification via FCM
    const message = {
      notification: {
        title: notification.title,
        body: notification.body,
      },
      token: userToken,
    };

    await messaging.send(message);
    res.status(200).json({ message: 'Notification sent and saved', notification });
  } catch (error) {
    console.error('Error sending notification:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all notifications
app.get('/api/notapi/notification/:field/:value', async (req, res) => {
  try {
    const field = req.params.field;
    const value = req.params.value;
    if(schemaFields.includes(field)){
      const notification = await Notification.find().where(field).equals(value);
      res.status(200).json(notification);
    }
    else{
      res.status(400).send({error: "Bad Request"});
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to save FCM token for a user
app.post('/api/notapi/notification/save-token', async (req, res) => {
  const { userId, token } = req.body;

  try {
    // Assuming you have a User model with an fcmToken field
    const user = await User.findByIdAndUpdate(
      userId,
      { fcmToken: token }, // Update the user's FCM token
      { new: true, useFindAndModify: false }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "Token saved successfully", user });
  } catch (error) {
    console.error('Error saving token:', error);
    res.status(500).json({ error: error.message });
  }
});

mongoose.set("strictQuery", false);
mongoose
  .connect(database)
  .then(() => {
    console.log("Connected!");
    app.listen(PORT, () => {
      console.log("Server Listening on PORT:", PORT);
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });

// Export the router
module.exports = app;
