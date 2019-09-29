const express = require('express');
const router = express.Router();

const expReport = require('../../controllers/expReport');

// @route  GET api/users
// @desc   Get all users
// @access Public
router.get('/',expReport.getReports);

router.post('/',expReport.createReport);

router.get('/:id/expenses/:eid', expReport.getExpense);


module.exports = router;