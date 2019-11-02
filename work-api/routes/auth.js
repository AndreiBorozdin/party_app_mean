const express = require('express');
const router = express.Router();
const AuthCtrl = require('../controllers/authCtrl');


router.post('/register', AuthCtrl.SignupUser);
router.post('/login', AuthCtrl.LoginUser);


module.exports = router;