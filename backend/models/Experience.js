import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  slots: [{
    date: {
      type: Date,
      required: true
    },
    availableSpots: {
      type: Number,
      required: true,
      default: 10
    },
    isBooked: {
      type: Boolean,
      default: false
    }
  }]
});

export default mongoose.model('Experience', experienceSchema);