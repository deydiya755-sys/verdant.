import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  scientificName: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  heroImage: { type: String },
  gallery: [{ type: String }],
  badge: { type: String },
  lightLevel: { type: String },
  lightDescription: { type: String },
  watering: { type: String },
  wateringSchedule: { type: String },
  petFriendly: { type: Boolean, default: false },
  difficulty: { type: String },
  difficultyRating: { type: Number },
  size: { type: String },
  potSizes: [mongoose.Schema.Types.Mixed],
  planters: [mongoose.Schema.Types.Mixed],
  description: { type: String },
  secondaryDescription: { type: String },
  airPurifying: { type: String },
  growthHabit: { type: String },
  reviewsCount: { type: Number, default: 0 },
  rating: { type: Number, default: 5 }
}, {
  timestamps: true
});

const Plant = mongoose.models.Plant || mongoose.model('Plant', plantSchema);
export default Plant;
