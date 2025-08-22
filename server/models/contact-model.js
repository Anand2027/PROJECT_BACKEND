const { Schema, model } = require("mongoose");

const contactSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,   // ✅ removed "unique"
  },
  message: {
    type: String,
    required: true,
  },
}, { timestamps: true }); // ✅ adds createdAt & updatedAt automatically

const Contact = model("Contact", contactSchema);

module.exports = Contact;
