const Login = require("../../models/Login/Login");
const jwt = require("jsonwebtoken"); // Ensure this line is present



const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await Login.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: "Username or Email already exists" });
        }

        // Create new user
        const newUser = new Login({
            username,
            email,
            password,
            role
           
        });

        // Save user to the database
        await newUser.save();

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error("Error in user registration:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Check if user exists
        const user = await Login.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Check if password is correct
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_EXPIRY || "1h" }
        );

        res.status(200).json({ message: "User logged in successfully", token, user });

    } catch (error) {
        console.error("Error in user login:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = login;






module.exports = {register,login};
