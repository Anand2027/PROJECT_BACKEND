const Contact = require("../models/contact-model");

 const contactForm = async (requ,res)=>{
    try{
      const response = requ.body;
      await Contact.create(response)
      return res.status(200).json({message:"message send successfully"})
    }catch(err){
  return res.status(500).json({message:"message not delivvered"});
    }
 }

 module.exports = contactForm