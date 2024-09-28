// const express = require("express");
// const app = express();
// const cors = require('cors');
// app.use(cors());
// app.use(express.json());


// app.get("/", (req, res) => res.send("Include API specification for all APIs!"));

// app.get("/api", (req, res) => res.send("API Gateway"));

// const PORT = 3000 || process.env.PORT;

// app.listen(PORT, () => console.log("Server ready on port 3000."));

// module.exports = app;

const express = require("express");
const app = express();
const cors = require('cors');
const notificationRoutes = require('../api/notapi'); // Adjust the path as necessary

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => res.send("Include API specification for all APIs!"));

// API gateway route
app.get("/api", (req, res) => res.send("API Gateway"));

// Use the notifications API routes
app.use("/api/notapi", notificationRoutes); // Register the notifications API

const PORT = process.env.PORT || 3000; // Use environment variable if defined

app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));

module.exports = app;
