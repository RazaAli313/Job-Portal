const express = require('express');
const router = express.Router();
const jobController = require('../../../controllers/jobController');

const auth = require('../../../middleware/auth');
const roles = require('../../../middleware/roles');

// Only employer and admin can post jobs
router.post('/', auth, roles(['employer', 'admin']), jobController.createJob);
// All authenticated users can view jobs
router.get('/', auth, roles(['admin', 'employer', 'candidate']), jobController.getJobs);
router.get('/:id', auth, roles(['admin', 'employer', 'candidate']), jobController.getJob);
// Only employer and admin can update/delete jobs
router.put('/:id', auth, roles(['employer', 'admin']), jobController.updateJob);
router.delete('/:id', auth, roles(['employer', 'admin']), jobController.deleteJob);

// Get jobs posted by the logged-in employer
router.get('/my', auth, roles(['employer', 'admin']), jobController.getMyJobs);

module.exports = router;
