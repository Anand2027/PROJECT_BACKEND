
const express = require("express");
const router = express.Router();
const contactForm = require("../controllers/contact-controller");

// POST /api/form/contact
router.route("/contact").post(contactForm);

// Export the router so server.js can use it
module.exports = router;