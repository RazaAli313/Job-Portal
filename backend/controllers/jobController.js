
exports.getMyJobs = async (req, res) => {
  try {
    console.log('getMyJobs: req.user:', req.user);
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: 'Missing employer user ID' });
    }
    const jobs = await Job.find({ postedBy: req.user.id }).populate('company postedBy');
    console.log('getMyJobs: jobs found:', jobs);
    res.json(Array.isArray(jobs) ? jobs : []);
  } catch (err) {
    console.error('getMyJobs error:', err);
    res.status(500).json({ message: err.message });
  }
};
const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  try {
    console.log('Create Job request by user:', req.user);
    const job = new Job({ ...req.body, postedBy: req.user.id });
    await job.save();
    console.log('Job created:', job);
    res.status(201).json(job);
  } catch (err) {
    console.error('Error creating job:', err);
    res.status(500).json({ message: err.message });
  }
};

exports.getJobs = async (req, res) => {
  try {
    console.log('Get Jobs request by user:', req.user);
    const jobs = await Job.find().populate('company postedBy');
    console.log('Jobs found:', jobs.length);
    res.json(jobs);
  } catch (err) {
    console.error('Error fetching jobs:', err);
    res.status(500).json({ message: err.message });
  }
};

exports.getJob = async (req, res) => {
  try {
    console.log('Get single Job request by user:', req.user, 'Job ID:', req.params.id);
    const job = await Job.findById(req.params.id).populate('company postedBy');
    if (!job) {
      console.warn('Job not found:', req.params.id);
      return res.status(404).json({ message: 'Job not found' });
    }
    console.log('Job found:', job);
    res.json(job);
  } catch (err) {
    console.error('Error fetching job:', err);
    res.status(500).json({ message: err.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    console.log('Update Job request by user:', req.user, 'Job ID:', req.params.id, 'Update:', req.body);
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) {
      console.warn('Job not found for update:', req.params.id);
      return res.status(404).json({ message: 'Job not found' });
    }
    console.log('Job updated:', job);
    res.json(job);
  } catch (err) {
    console.error('Error updating job:', err);
    res.status(500).json({ message: err.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    console.log('Delete Job request by user:', req.user, 'Job ID:', req.params.id);
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      console.warn('Job not found for deletion:', req.params.id);
      return res.status(404).json({ message: 'Job not found' });
    }
    console.log('Job deleted:', job);
    res.json({ message: 'Job deleted' });
  } catch (err) {
    console.error('Error deleting job:', err);
    res.status(500).json({ message: err.message });
  }
};
