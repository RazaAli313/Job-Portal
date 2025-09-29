// Get applications received for jobs posted by the logged-in employer
const Job = require('../models/Job');
exports.getReceivedApplications = async (req, res) => {
  try {
    console.log('getReceivedApplications: req.user:', req.user);
    // Find jobs posted by this employer
    const jobs = await Job.find({ postedBy: req.user.id }).select('_id');
    console.log('getReceivedApplications: jobs found:', jobs);
    const jobIds = jobs.map(j => j._id);
    // Find applications for those jobs
    const applications = await Application.find({ job: { $in: jobIds } }).populate('job candidate');
    console.log('getReceivedApplications: applications found:', applications);
    res.json(applications);
  } catch (err) {
    console.error('getReceivedApplications error:', err);
    res.status(500).json({ message: err.message });
  }
};
const Application = require('../models/Application');

exports.createApplication = async (req, res) => {
  try {
    const application = new Application({ ...req.body, candidate: req.user.id });
    await application.save();
    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate('job candidate');
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate('job candidate');
    if (!application) return res.status(404).json({ message: 'Application not found' });
    res.json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!application) return res.status(404).json({ message: 'Application not found' });
    res.json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);
    if (!application) return res.status(404).json({ message: 'Application not found' });
    res.json({ message: 'Application deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
