const express = require("express");
const adminController = require("../controllers/admin-controller")             //  40.0
const router = express.Router();
const authMiddleware = require("../middlewares/auth-middleware");               //  41.0
const adminMiddleware = require("../middlewares/admin-middleware");


router
.route("/users")
.get(authMiddleware,adminMiddleware, adminController.getAllUsers)                     //  41.0


router
.route("/users/:id")
.get(authMiddleware,adminMiddleware, adminController.getUserById)    // 45

router
.route("/users/update/:id")
.patch(authMiddleware,adminMiddleware, adminController.updateUserById) //  48


router
.route("/users/delete/:id")
.delete(authMiddleware,adminMiddleware, adminController.deleteUserById)    // 45

router
.route("/contacts")
.get(authMiddleware,adminMiddleware, adminController.getAllContacts)            //  41.0

router
.route("/contacts/delete/:id")
.delete(authMiddleware,adminMiddleware, adminController.deleteContactById)    // 51


module.exports = router;