const express = require('express');
const router = express.Router();
const auth = require('../../helpers/authJWT');
const { check } = require('express-validator');

// User Model
const user = require('../../controllers/users');

// @route   GET api/users
// @descr   Get All Users
// @access  Private
router.get('/', auth.verify, user.getUsers);

// @route   POST api/users
// @descr   Create An User
// @access  Public
router.post('/register', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Passoword is required').not().isEmpty()
],user.registerUser);

// @route   Delete api/users/id
// @descr   Delete A User
// @access  Protected? Private?
router.delete('/:id',auth.verify, user.deleteUser);

// @route   Put api/users/:id
// @descr   Update A User
// @access  Protected
// router.put('/:id', user.updateUser);


// @route   POST api/users/login
// @descr   Login A User
// @access  Public
router.post('/login',[
    check('email', 'Email is required').not().isEmpty(),
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Passoword is required').not().isEmpty()
], user.loginUser);

// @route   Get api/users/:id
// @descr   Get A User
// @access  Protected
router.get('/:id',auth.verify, user.getUser);

module.exports = router;