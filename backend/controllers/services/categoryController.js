const Category = require('../../models/services/categoryModel');

const createCategory = async (req,res)=>{
    try {
        const {   category } = req.body;
        const newCategory = new Category({   category });
        await newCategory.save();
        res.status(201).json({ message: "Category created successfully", category: newCategory });
    } catch (error) {
        res.status(500).json({ message: "Error creating category", error: error.message });
    }

}

const getAllCategories = async (req, res)=>{
    try {
        console.log("Getting all categories")
        const categories = await Category.find();
        console.log(categories);
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error fetching categories", error: error.message });
    }
}

const getCategoryById = async (req, res)=>{
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: "Error fetching category", error: error.message });
    }
}

const updateCategory = async (req, res)=>{
    try {
        const updatedData = {
            name: req.body.name,
        };
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: "Error updating category", error: error.message });
    }
}

const deleteCategory = async (req, res)=>{
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting category", error: error.message });
    }
}

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
