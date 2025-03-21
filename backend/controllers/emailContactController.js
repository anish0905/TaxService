const EmailContact = require("../models/emailContact");

// Send an email to a contact
const createEmail = async(req,res)=>{
    try{
        const {email} = req.body;
       const newEmailContact = new EmailContact(email);
       await newEmailContact.save();
       res.status(201).json({message:"Email sent successfully"})


    }
    catch(error){
        res.status(500).json({message:"Error sending email",error:error.message})
    }

}
module.exports = {createEmail}