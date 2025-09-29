const express = require('express');
const router = express.Router();
const applicationController = require('../../../controllers/applicationController');

const auth = require('../../../middleware/auth');
const roles = require('../../../middleware/roles');

router.get('/received', auth, roles(['employer', 'admin']), applicationController.getReceivedApplications);
// Only candidate and admin can create applications
router.post('/', auth, roles(['candidate', 'admin']), applicationController.createApplication);
// All authenticated users can view applications
router.get('/', auth, roles(['admin', 'employer', 'candidate']), applicationController.getApplications);
router.get('/:id', auth, roles(['admin', 'employer', 'candidate']), applicationController.getApplication);
// Only admin can update/delete applications
router.put('/:id', auth, roles(['admin']), applicationController.updateApplication);
router.delete('/:id', auth, roles(['admin']), applicationController.deleteApplication);

// Get applications received for jobs posted by the logged-in employer

module.exports = router;
