const express = require('express');
const Login = require("../controllers/Login/Login")

const router = express.Router();



router.post("/register", Login.register);
router.post("/login",Login.login);

module.exports = router
