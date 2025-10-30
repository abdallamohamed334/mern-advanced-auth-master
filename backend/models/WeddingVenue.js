import mongoose from 'mongoose';

const weddingVenueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['قاعة أفراح', 'حديقة خارجية', 'فيلا', 'قاعة فندقية']
  },
  category: {
    type: String,
    required: true,
    enum: ['فاخرة', 'طبيعية', 'كلاسيكية', 'عصرية', 'اقتصادية']
  },
  governorate: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true,
    min: 10
  },
  price: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  features: [{
    type: String
  }],
  description: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  contact: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  amenities: [{
    type: String
  }],
  rules: [{
    type: String
  }],
  weddingSpecific: {
    brideRoom: { type: Boolean, default: false },
    photography: { type: Boolean, default: false },
    catering: { type: Boolean, default: false },
    decoration: { type: Boolean, default: false },
    maxGuests: { type: Number, default: 0 }
  }
}, {
  timestamps: true
});

export default mongoose.model('WeddingVenue', weddingVenueSchema);