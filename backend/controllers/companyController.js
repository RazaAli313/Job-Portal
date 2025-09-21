const Company = require('../models/Company');

exports.createCompany = async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCompanies = async (req, res) => {
  try {
    const companies = await Company.find().populate('jobs');
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate('jobs');
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.json({ message: 'Company deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
