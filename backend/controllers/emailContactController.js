const EmailContact = require("../models/emailContact");

// Send an email to a contact


exports.createEmailContact = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const newContact = new EmailContact({ email }); // ✅ Ensure this is an object
    await newContact.save();

    res.status(201).json({ message: "Email subscribed successfully" });
  } catch (error) {
    console.error("Error creating email contact:", error);
    res.status(500).json({ message: "Error sending email", error: error.message });
  }
};



exports.getEmailContact = async (req, res) => {
  try {
    const contact = await EmailContact.find();

    if (!contact || contact.length === 0) {
      return res.status(404).json({ message: "No email contacts found" });
    }

    res.status(200).json({ success: true, data: contact });
  } catch (error) {
    console.error("Error fetching email contacts:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

