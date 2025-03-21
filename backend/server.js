require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require("path");


// Connect to MongoDB

const dbConnection = require('./dbConnection/dbConnection');
const admin = require('./routes/LoginRoutes');
const videoRoutes = require("./routes/videoRoutes");

const serviceRoutes = require("./routes/services/servicesRoutes");  // Adding service routes here
const CategoryRoutes = require("./routes/services/categoryRputes"); // Adding service routes here
const subServiceRoutes = require("./routes/services/subServiceRoutes"); // Adding
const blogRoutes = require("./routes/blogRoutes");
const contactRoutes = require("./routes/contactRoutes");
const emailContactRoutes = require("./routes/emailContactRoutes");
const app = express();
const port = process.env.PORT || 5000;
dbConnection();

app.use("/uploads/videos", express.static(path.join(__dirname, "uploads/videos")));

app.use(cors());
app.use(bodyParser.json());

app.use('/api', admin);
app.use("/api/videos", videoRoutes);
app.use('/api/services', serviceRoutes); 

app.use('/api/services/categories', CategoryRoutes);  // Adding category routes here
app.use('/api/services',  subServiceRoutes); // Adding service routes here
app.use('/api/blogs', blogRoutes);

app.use('/api/contact', contactRoutes);  // Adding contact routes here

app.use('/api/contact/email', emailContactRoutes);  // Adding email contact routes here
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
