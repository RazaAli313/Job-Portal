const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  candidate: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resume: String,
  status: { type: String, enum: ['applied', 'reviewed', 'accepted', 'rejected'], default: 'applied' },
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
