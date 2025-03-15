const Service = require("../../models/services/service");

// ✅ Create a new service
const createService = async (req, res) => {
    try {
        const { name, description, category} = req.body;

        // Validate required fields
        if (!name || !category) {
            return res.status(400).json({ message: "Name and category are required" });
        }

        // Ensure a file was uploaded
        if (!req.file) {
            return res.status(400).json({ message: "Image file is required" });
        }

        // Create new service entry
        const newService = new Service({
            name,
            description,
            category,
            imageUrl: `/uploads/videos/${req.file.filename}`, // Assuming image is stored in 'uploads/images/'
        });

        await newService.save();
        res.status(201).json({ message: "Service created successfully", service: newService });

    } catch (error) {
        res.status(500).json({ message: "Error creating service", error: error.message });
    }
};

// ✅ Fetch all services
const getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ message: "Error fetching services", error: error.message });
    }
};

// ✅ Fetch a single service by ID
const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.status(200).json(service);
    } catch (error) {
        res.status(500).json({ message: "Error fetching service", error: error.message });
    }
};

// ✅ Update a service
const updateService = async (req, res) => {
    try {
        const { name, description, category } = req.body;
        const updatedData = { name, description, category };

        if (req.file) {
            updatedData.imageUrl = `/uploads/images/${req.file.filename}`;
        }

        const updatedService = await Service.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        if (!updatedService) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.status(200).json({ message: "Service updated successfully", service: updatedService });
    } catch (error) {
        res.status(500).json({ message: "Error updating service", error: error.message });
    }
};

// ✅ Delete a service
const deleteService = async (req, res) => {
    try {
        const deletedService = await Service.findByIdAndDelete(req.params.id);

        if (!deletedService) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.status(200).json({ message: "Service deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting service", error: error.message });
    }
};

module.exports = {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
};
