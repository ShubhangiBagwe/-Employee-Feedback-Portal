import Feedback from '../models/feedback.model.js';

export const createFeedback = async (req, res) => {
  const { text, category } = req.body;
  try {
    const feedback = await Feedback.create({ text, category });
    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllFeedback = async (req, res) => {
  const { category } = req.query;
  try {
    const filter = category ? { category } : {};
    const feedbacks = await Feedback.find(filter).sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const markAsReviewed = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { reviewed: true },
      { new: true }
    );
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: 'Feedback deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
