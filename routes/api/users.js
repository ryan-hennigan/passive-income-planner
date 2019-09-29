const express = require('express');
const router = express.Router();

// User Model
const user = require('../../controllers/users');

// @route   GET api/users
// @descr   Get All Users
// @access  Private
router.get('/', user.getUsers);

// @route   POST api/users
// @descr   Create An User
// @access  Public
router.post('/register',user.registerUser);

// @route   Delete api/users/id
// @descr   Delete A User
// @access  Protected? Private?
router.delete('/:id', user.deleteUser);

// @route   Put api/users/:id
// @descr   Update A User
// @access  Protected
// router.put('/:id', user.updateUser);


// @route   POST api/users/login
// @descr   Login A User
// @access  Public
router.post('/login', user.loginUser);

// @route   Get api/users/:id
// @descr   Get A User
// @access  Protected
router.get('/:id', user.getUser);

module.exports = router;