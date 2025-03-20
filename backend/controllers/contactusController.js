const Contact = require("../models/Contactus");

// @desc Submit Contact Form
// @route POST /api/contact
// @access Public
const submitContactForm = async (req, res) => {
  try {
    const { name, email, query } = req.body;

    // Validation
    if (!name || !email || !query) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save to database
    const contact = new Contact({ name, email, query });
    await contact.save();

    res.status(201).json({ message: "Query submitted successfully!" });
  } catch (error) {
    console.error("Error submitting query:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// @desc Get all contact queries
// @route GET /api/contact
// @access Admin
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching queries:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { submitContactForm, getAllContacts };
