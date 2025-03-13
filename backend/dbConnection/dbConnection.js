const mongoose = require('mongoose');
async function dbConnection (req, res, next) {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to MongoDB at ${connect.connection.host}`);
        
    } catch (error) {
        console.log(`Error connecting to MongoDB`);
        process.exit(1);
        
    }
   

  
}

module.exports = dbConnection;
