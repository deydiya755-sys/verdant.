import express from 'express';
import { getQuizRecommendations } from '../controllers/quizController.js';

const router = express.Router();

router.post('/recommend', getQuizRecommendations);

export default router;
