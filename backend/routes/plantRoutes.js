import express from 'express';
import {
  getPlants,
  getPlantById,
  getCuratedPlants,
  getAccessories
} from '../controllers/plantController.js';

const router = express.Router();

router.get('/', getPlants);
router.get('/curated', getCuratedPlants);
router.get('/accessories', getAccessories);
router.get('/:id', getPlantById);

export default router;
