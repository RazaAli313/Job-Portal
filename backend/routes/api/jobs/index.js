
const express = require('express');
const router = express.Router();
const jobController = require('../../../controllers/jobController');

const auth = require('../../../middleware/auth');
const roles = require('../../../middleware/roles');

router.get('/my', auth, roles(['employer', 'admin']), jobController.getMyJobs);

router.post('/', auth, roles(['employer', 'admin']), jobController.createJob);
router.get('/', jobController.getJobs);
router.get('/:id', auth, roles(['admin', 'employer', 'candidate']), jobController.getJob);

router.put('/:id', auth, roles(['employer', 'admin']), jobController.updateJob);
router.delete('/:id', auth, roles(['employer', 'admin']), jobController.deleteJob);




module.exports = router;
