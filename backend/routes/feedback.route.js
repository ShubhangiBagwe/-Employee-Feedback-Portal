import express from 'express';
import {
  createFeedback,
  getAllFeedback,
  markAsReviewed,
  deleteFeedback
} from '../controllers/feedback.controller.js';

const router = express.Router();

router.post('/', createFeedback);
router.get('/', getAllFeedback);
router.patch('/:id/reviewed', markAsReviewed);
router.delete('/:id', deleteFeedback);

export default router;
