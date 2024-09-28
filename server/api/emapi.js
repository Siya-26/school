// const express = require("express");
// const app = express();
// const cors = require('cors');
// app.use(cors()); // enforce cors later
// app.use(express.json());

// const Events = require("../models/event.models");
// const mongoose = require("mongoose");
// require('dotenv').config();

// // GLOBAL VARIABLES
// const PORT = process.env.ENV || 3000;
// const database = process.env.MONGO_DATABASE_CONNECT;
// const schemaFields = ["name", "description", "date", "duration", "location", "poster", "capacity", "creator"];

// // REQUESTS

// app.get('/api/emapi/events', async (req, res) => {
//   try{
//     const events = await Events.find();
//     res.status(200).json(events);
//   }
//   catch(error){
//     res.status(500).json({error: error.message})
//   }
// });

// app.get('/api/emapi/events/:field/:value', async (req, res) => {
//   try {
//     const field = req.params.field;
//     const value = req.params.value;
//     if(schemaFields.includes(field)){
//       const events = await Events.find().where(field).equals(value);
//       res.status(200).json(events);
//     }
//     else{
//       res.status(400).send({error: "Bad Request"});
//     }
//   } catch (error) {
//     res.status(500).send({message: error.message})
//   }
// })

// app.post('/api/emapi/event/create', async (req, res) => {
//   try {
//     const event = await Events.create(req.body);
//     res.status(200).json(event);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// app.get('/api/emapi/event/:id/:field', async (req, res) => {
//   try {
//     const eventID = req.params.id;
//     const field = req.params.field;
//     if(schemaFields.includes(field)){
//       const event = await Events.find({_id: eventID});
//       res.status(200).json({[field]: event[0][field]});
//     }
//     else{
//       res.status(400).send({error: "Bad Request"})
//     }
//   } catch (error) {
//     res.status(500).send({message: error.message})
//   }
// });

// app.put('/api/emapi/event/:id', async (req, res) => {
//   try {
//     const event = await Events.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true});
//     res.status(200).send(event);
//   } catch (error) {
//     res.status(500).send({error: error.message});
//   }
// });

// app.put('/api/emapi/event/like/:id', async (req, res) => {
//   try {
//     const event = await Events.findByIdAndUpdate(
//       {_id: req.params.id},
//       { $inc: { likes: 1 } }, // Increment likes by 1
//       { new: true } // Return the updated document
//     );
//     res.status(200).send(event);
//   } catch (error) {
//     res.status(500).send({error: error.message});
//   }
// })

// app.delete('/api/emapi/event/:id', async (req, res) => {
//   try {
//     await Events.findByIdAndDelete({_id: req.params.id});
//     res.status(200).send({status: "Event successfully deleted"});
//   } catch (error) {
//     res.status(500).send({error: error.message})
//   }
// });

// mongoose.set("strictQuery", false);
// mongoose
//   .connect(database)
//   .then(() => {
//     console.log("Connected!");
//     app.listen(PORT, () => {
//       console.log("Server Listening on PORT:", PORT);
//     });
//   })
//   .catch(() => {
//     console.log("Connection failed!");
//   });


const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const Events = require("../models/event.models");
const mongoose = require("mongoose");
require('dotenv').config();
const admin = require("firebase-admin"); // Import Firebase Admin SDK

// // Initialize Firebase Admin SDK
// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
// });

// GLOBAL VARIABLES
const PORT = process.env.ENV || 3000;
const database = process.env.MONGO_DATABASE_CONNECT;
const schemaFields = ["name", "description", "date", "duration", "location", "poster", "capacity", "creator"];

// REQUESTS

app.get('/api/emapi/events', async (req, res) => {
  try {
    const events = await Events.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/emapi/events/:field/:value', async (req, res) => {
  try {
    const field = req.params.field;
    const value = req.params.value;
    if (schemaFields.includes(field)) {
      const events = await Events.find().where(field).equals(value);
      res.status(200).json(events);
    } else {
      res.status(400).send({ error: "Bad Request" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// Modified Event Creation with Notification
app.post('/api/emapi/event/create', async (req, res) => {
  try {
    const event = await Events.create(req.body);
    
    // Prepare the notification message
    const message = {
      notification: {
        title: 'New Event Created',
        body: `A new event "${event.name}" has been created!`,
      },
      topic: 'events', // Use a topic to broadcast the notification
    };

    // Send the notification
    await admin.messaging().send(message);

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/emapi/event/:id/:field', async (req, res) => {
  try {
    const eventID = req.params.id;
    const field = req.params.field;
    if (schemaFields.includes(field)) {
      const event = await Events.find({ _id: eventID });
      res.status(200).json({ [field]: event[0][field] });
    } else {
      res.status(400).send({ error: "Bad Request" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

app.put('/api/emapi/event/:id', async (req, res) => {
  try {
    const event = await Events.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.status(200).send(event);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.put('/api/emapi/event/like/:id', async (req, res) => {
  try {
    const event = await Events.findByIdAndUpdate(
      { _id: req.params.id },
      { $inc: { likes: 1 } }, // Increment likes by 1
      { new: true } // Return the updated document
    );
    res.status(200).send(event);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
})

app.delete('/api/emapi/event/:id', async (req, res) => {
  try {
    await Events.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send({ status: "Event successfully deleted" });
  } catch (error) {
    res.status(500).send({ error: error.message });
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
