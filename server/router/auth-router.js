const express = require('express');
const router = express.Router();

const authcontrollers = require('../controllers/auth-controller');
const  signupSchema  = require('../validators/auth-validator');
const validate = require('../middlewares/validate-middleware');

// GET /api/auth/
router.route('/').get(authcontrollers.home);

// POST /api/auth/register (with validation)
router.route('/register').post(validate(signupSchema ), authcontrollers.register);
// POST /api/auth/login
router.route('/login').post(authcontrollers.login); 
// POST /api/auth/logout


module.exports = router;


