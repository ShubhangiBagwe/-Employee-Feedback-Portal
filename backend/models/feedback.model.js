import mongoose from 'mongoose';

const FeedbackSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['Work Environment', 'Leadership', 'Growth', 'Others'],
    required: true
  },
  reviewed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Feedback', FeedbackSchema);
