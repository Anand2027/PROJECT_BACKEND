const express = require("express");
const adminController = require("../controllers/admin-controller")             //  40.0
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware")               //  41.0


router.route("/users").get(authMiddleware, adminController.getAllUsers)                     //  41.0
router.route("/contacts").get(authMiddleware, adminController.getAllContacts)            //  41.0

module.exports = router;