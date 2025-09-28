const Job = require('../models/Job');



// Get jobs posted by the logged-in employer

exports.getMyJobs = async (req, res) => {
  try {
    console.log('getMyJobs: req.user:', req.user);
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: 'Missing employer user ID' });
    }
    const jobs = await Job.findAll({ location }).populate('company postedBy');
    console.log('getMyJobs: jobs found:', jobs);
    res.json(Array.isArray(jobs) ? jobs : []);
  } catch (err) {
    console.error('getMyJobs error:', err);
    res.status(500).json({ message: err.message });
  }
};
