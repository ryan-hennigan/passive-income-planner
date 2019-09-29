const express = require('express');
const router = express.Router();

const users = require('../../controllers/users');

// @route  GET api/users
// @desc   Get all users
// @access Public
router.get('/',users.getUsers);


module.exports = router;