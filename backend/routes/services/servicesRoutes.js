const express = require('express');
const router = express.Router();
const {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService
} = require('../../controllers/services/services.js');

// Define routes
router.post('/', createService); // Create a service
router.get('/', getAllServices); // Get all services
router.get('/:id', getServiceById); // Get service by ID
router.put('/:id', updateService); // Update a service
router.delete('/:id', deleteService); // Delete a service

module.exports = router;
