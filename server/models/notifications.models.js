// models/notification.models.js
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: true,
  },
  creator: {
    type: creatorSchema,
    required: true,
  },
  userToken: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
},
{
  timestamps: true,
},
{
  collection: "notifications",
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
