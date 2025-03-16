const express = require('express');
const { createSubService,getSubServiceById } = require('../../controllers/services/subServiceController');

const router = express.Router();

// Route to create a new sub-service
router.post('/subservices', createSubService);
router.get("/subservices/:serviceId", getSubServiceById);

module.exports = router;
