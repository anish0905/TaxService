const express = require('express');
const router = express.Router();
const emailContactController = require("../controllers/emailContactController")



router.post("/" , emailContactController.createEmailContact);
router.get("/" , emailContactController.getEmailContact);

module.exports = router;