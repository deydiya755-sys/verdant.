import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const plantsFilePath = path.join(__dirname, '../data/plants.json');

export const getQuizRecommendations = (req, res) => {
  try {
    const { light, watering, pet, experience } = req.body;

    const data = fs.readFileSync(plantsFilePath, 'utf8');
    const plants = JSON.parse(data);

    // Scoring Algorithm
    const scoredPlants = plants.map(plant => {
      let score = 50; // baseline score
      let matchReasons = [];

      // Pet filter
      if (pet === 'yes') {
        if (plant.petFriendly) {
          score += 45;
          matchReasons.push('100% Non-Toxic & Pet Safe');
        } else {
          score -= 100; // heavy penalty if user has curious pets
        }
      } else {
        score += 10;
      }

      // Light filter
      if (light === 'low') {
        if (plant.lightLevel.toLowerCase().includes('low')) {
          score += 40;
          matchReasons.push('Flourishes in dimmer/ambient rooms');
        }
      } else if (light === 'direct') {
        if (plant.lightLevel.toLowerCase().includes('direct')) {
          score += 40;
          matchReasons.push('Thrives along sunlit windowsills');
        }
      } else if (light === 'indirect') {
        if (plant.lightLevel.toLowerCase().includes('indirect')) {
          score += 40;
          matchReasons.push('Optimal for bright filtered light');
        }
      }

      // Watering habit
      if (watering === 'forgetful') {
        if (plant.watering.toLowerCase().includes('2-3') || plant.difficulty === 'Easy') {
          score += 35;
          matchReasons.push('High drought tolerance for busy schedules');
        }
      } else if (watering === 'attentive') {
        if (plant.watering.toLowerCase().includes('weekly') || plant.difficulty !== 'Easy') {
          score += 30;
          matchReasons.push('Rewards active weekend hydration rituals');
        }
      } else {
        score += 20;
      }

      // Experience
      if (experience === 'beginner') {
        if (plant.difficulty === 'Easy') {
          score += 35;
          matchReasons.push('Resilient & forgiving for first-time parents');
        }
      } else if (experience === 'expert') {
        if (plant.difficulty === 'Advanced' || plant.badge === 'Statement') {
          score += 35;
          matchReasons.push('Intriguing botanical architecture for green thumbs');
        }
      } else {
        score += 20;
      }

      return {
        ...plant,
        score,
        matchReasons
      };
    });

    // Sort descending by score
    scoredPlants.sort((a, b) => b.score - a.score);

    // Pick top 3
    const topMatches = scoredPlants.slice(0, 3).map((p, index) => ({
      ...p,
      matchTag: index === 0 ? 'Top Match' : 'Strong Match',
      matchScore: Math.min(99, Math.max(82, p.score))
    }));

    return res.json({
      success: true,
      diagnosticAnswers: { light, watering, pet, experience },
      count: topMatches.length,
      recommendations: topMatches
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error computing quiz diagnostic', error: error.message });
  }
};
