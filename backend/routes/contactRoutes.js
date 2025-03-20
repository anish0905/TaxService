const express = require("express");
const router = express.Router();
const { submitContactForm, getAllContacts } = require("../controllers/contactusController");

// Route to submit contact form
router.post("/", submitContactForm);

// Route to get all contact queries (admin access)
router.get("/", getAllContacts);

module.exports = router;
