const SubService = require('../../models/services/subServiceModel');

// Create a new SubService
const createSubService = async (req, res) => {
    try {
        const { serviceId, name, description, price, imageUrl } = req.body;

        // Check if required fields are provided
        if (!serviceId || !name || !price) {
            return res.status(400).json({ message: "Service ID, name, and price are required." });
        }

        // Create new SubService
        const newSubService = new SubService({
            serviceId,
            name,
            description,
            price,
          
        });

        // Save to database
        const savedSubService = await newSubService.save();
        res.status(201).json({ message: "Sub-service created successfully!", data: savedSubService });

    } catch (error) {
        res.status(500).json({ message: "Error creating sub-service", error });
    }
};


const getSubServiceById = async (req, res) => {
    try {
        const { serviceId } = req.params;

        // Find sub-service by serviceId field instead of _id
        const subService = await SubService.find({ serviceId }).populate("serviceId");

        if (!subService) {
            return res.status(404).json({ message: "Sub-service not found" });
        }

        res.status(200).json(subService);
    } catch (error) {
        res.status(500).json({ message: "Error fetching sub-service", error });
    }
};


module.exports = { createSubService,getSubServiceById  };
