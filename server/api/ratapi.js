const express = require("express");
const app = express();
const admin = require("firebase-admin"); // Import Firebase Admin SDK
require('dotenv').config();

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

app.use(express.json());

app.get("/api/ratapi", (req, res) => res.send("Registering & Ticketing API"));

// POST endpoint for creating a ticket (or purchasing a ticket)
app.post("/api/ratapi/ticket/create", async (req, res) => {
  try {
    const ticketDetails = req.body; // Assuming the ticket details are sent in the request body

    // Logic to create a ticket (e.g., save to the database) should go here

    // Prepare the notification message
    const message = {
      notification: {
        title: 'New Ticket Purchased',
        body: `A new ticket has been purchased for the event "${ticketDetails.eventName}".`,
      },
      topic: 'tickets', // Use a topic to broadcast the notification
    };

    // Send the notification
    await admin.messaging().send(message);

    res.status(201).json({ status: "Ticket created successfully", ticketDetails });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Example endpoint for registering a ticket
app.post("/api/ratapi/ticket/register", async (req, res) => {
  try {
    const registrationDetails = req.body; // Assuming registration details are sent in the request body

    // Logic to register the ticket (e.g., save to the database) should go here

    // Prepare the notification message
    const message = {
      notification: {
        title: 'Ticket Registered',
        body: `Your ticket for the event "${registrationDetails.eventName}" has been successfully registered.`,
      },
      topic: 'tickets', // Use a topic to broadcast the notification
    };

    // Send the notification
    await admin.messaging().send(message);

    res.status(201).json({ status: "Ticket registered successfully", registrationDetails });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
