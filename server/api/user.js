const express = require("express");
const app = express();
const Users = require('../models/user.models');
const mongoose = require("mongoose");
const cors = require('cors');
app.use(express.json());
app.use(cors());
// GLOBAL VARIABLES
const PORT = process.env.PORT || 5000;
const database =
  "mongodb+srv://TumeloMkwambe:T69M5gA2oWaG1w@cluster0.79zpfwz.mongodb.net/WitsEvents?retryWrites=true&w=majority&appName=Cluster0";
const schemaFields = ["name", "description", "date", "duration", "location", "poster", "capacity", "creator"];


// MIDDLEWARE
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

// REQUESTS

app.get('/api/users', async (req, res) => {
  try{
    const users = await Users.find();
    res.status(200).json(users);
  }
  catch(error){
    res.status(500).json({error: error.message});
  }
});

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})

app.put('/api/users/like/:id', async (req, res) => {
  try {
      const updatedUser = await Users.findByIdAndUpdate(
          {_id: req.params.id},
          { $push: { liked_events: [req.body.entry] } },
          { new: true }
      );

      res.status(200).send(updatedUser);
  } catch (error) {
      res.status(500).send({ error: error.message });
  }
});

app.post('/api/users/create', async (req, res) => {
  try {
    const existingUser = await Users.findOne({ email: req.body.email });
    if(!existingUser){
      const user = await Users.create(req.body);
      res.status(200).json(user);
    }
    else{
      res.status(200).json(existingUser);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
