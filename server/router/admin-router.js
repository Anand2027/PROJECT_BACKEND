const express = require("express");
const adminController = require("../controllers/admin-controller")             //  40.0
const router = express.Router();


router.route("/users").get(adminController.getAllUsers)                     //  40.0
router.route("/contacts").get(adminController.getAllContacts)            //  40.0 

module.exports = router;