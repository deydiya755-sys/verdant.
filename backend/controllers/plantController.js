import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import Plant from '../models/Plant.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const plantsFilePath = path.join(__dirname, '../data/plants.json');
const accessoriesFilePath = path.join(__dirname, '../data/accessories.json');

const loadPlantsFromJSON = () => {
  try {
    const data = fs.readFileSync(plantsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading plants.json:', error);
    return [];
  }
};

const loadAccessoriesFromJSON = () => {
  try {
    const data = fs.readFileSync(accessoriesFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading accessories.json:', error);
    return [];
  }
};

// Seed MongoDB if empty
const seedPlantsIfEmpty = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      const count = await Plant.countDocuments();
      if (count === 0) {
        const jsonPlants = loadPlantsFromJSON();
        if (jsonPlants.length > 0) {
          await Plant.insertMany(jsonPlants);
          console.log(`🌱 Auto-seeded ${jsonPlants.length} plants into MongoDB.`);
        }
      }
    }
  } catch (err) {
    console.error('Plant seeding warning:', err.message);
  }
};

export const getPlants = async (req, res) => {
  try {
    const isDBConnected = mongoose.connection.readyState === 1;
    let plants = [];

    if (isDBConnected) {
      await seedPlantsIfEmpty();
      plants = await Plant.find({}).lean();
    } else {
      plants = loadPlantsFromJSON();
    }

    const { light, pet, size, difficulty, category, search, sort } = req.query;

    // Search query
    if (search && search.trim() !== '') {
      const q = search.toLowerCase();
      plants = plants.filter(p =>
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.scientificName && p.scientificName.toLowerCase().includes(q)) ||
        (p.lightLevel && p.lightLevel.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // Light filter
    if (light) {
      const lightFilters = Array.isArray(light) ? light : light.split(',');
      plants = plants.filter(p =>
        p.lightLevel && lightFilters.some(l => p.lightLevel.toLowerCase().includes(l.toLowerCase()))
      );
    }

    // Pet friendly filter
    if (pet === 'true') {
      plants = plants.filter(p => p.petFriendly === true);
    }

    // Size filter
    if (size) {
      const sizes = Array.isArray(size) ? size : size.split(',');
      plants = plants.filter(p => sizes.includes(p.size));
    }

    // Difficulty filter
    if (difficulty) {
      const diffs = Array.isArray(difficulty) ? difficulty : difficulty.split(',');
      plants = plants.filter(p => p.difficulty && diffs.some(d => p.difficulty.toLowerCase() === d.toLowerCase()));
    }

    // Category bento filter
    if (category) {
      if (category === 'statement') {
        plants = plants.filter(p => p.badge === 'Statement' || p.size === 'Extra Large' || p.price > 60);
      } else if (category === 'low') {
        plants = plants.filter(p => p.lightLevel && p.lightLevel.toLowerCase().includes('low'));
      } else if (category === 'pet') {
        plants = plants.filter(p => p.petFriendly === true);
      } else if (category === 'easy') {
        plants = plants.filter(p => p.difficulty === 'Easy');
      }
    }

    // Sorting
    if (sort === 'price-asc' || sort === 'Price: Low to High') {
      plants.sort((a, b) => a.price - b.price);
    } else if (sort === 'price-desc' || sort === 'Price: High to Low') {
      plants.sort((a, b) => b.price - a.price);
    } else if (sort === 'popularity' || sort === 'Popularity') {
      plants.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
    }

    return res.json({
      success: true,
      count: plants.length,
      dataSource: isDBConnected ? 'MongoDB' : 'JSON Fallback',
      data: plants
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error retrieving plants', error: error.message });
  }
};

export const getPlantById = async (req, res) => {
  try {
    const isDBConnected = mongoose.connection.readyState === 1;
    let plant = null;

    if (isDBConnected) {
      plant = await Plant.findOne({ id: req.params.id }).lean();
    }
    
    if (!plant) {
      const plants = loadPlantsFromJSON();
      plant = plants.find(p => p.id === req.params.id);
    }

    if (!plant) {
      return res.status(404).json({ success: false, message: `Plant with ID '${req.params.id}' not found` });
    }

    return res.json({ success: true, dataSource: isDBConnected ? 'MongoDB' : 'JSON Fallback', data: plant });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error retrieving plant', error: error.message });
  }
};

export const getCuratedPlants = async (req, res) => {
  try {
    const isDBConnected = mongoose.connection.readyState === 1;
    let plants = [];

    if (isDBConnected) {
      plants = await Plant.find({}).limit(4).lean();
    }
    if (!plants || plants.length === 0) {
      const all = loadPlantsFromJSON();
      plants = all.slice(0, 4);
    }

    return res.json({ success: true, count: plants.length, data: plants });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error retrieving curated plants', error: error.message });
  }
};

export const getAccessories = (req, res) => {
  try {
    const accessories = loadAccessoriesFromJSON();
    return res.json({ success: true, count: accessories.length, data: accessories });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error retrieving accessories', error: error.message });
  }
};
