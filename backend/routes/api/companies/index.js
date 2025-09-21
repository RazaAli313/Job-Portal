const express = require('express');
const router = express.Router();
const companyController = require('../../../controllers/companyController');

const auth = require('../../../middleware/auth');
const roles = require('../../../middleware/roles');

// Only admin can create, update, delete companies
router.post('/', auth, roles(['admin']), companyController.createCompany);
router.put('/:id', auth, roles(['admin']), companyController.updateCompany);
router.delete('/:id', auth, roles(['admin']), companyController.deleteCompany);
// All authenticated users can view companies
router.get('/', auth, roles(['admin', 'employer', 'candidate']), companyController.getCompanies);
router.get('/:id', auth, roles(['admin', 'employer', 'candidate']), companyController.getCompany);

module.exports = router;
