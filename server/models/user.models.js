const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true
    },
    liked_events: {
        type: [String],
        required: false
    },
    my_events: {
        type: Array,
        required: false
    },
    fcmToken: {
        type : [String],
    },
  });
  const Users = mongoose.model('Users', UsersSchema);

  module.exports = Users;