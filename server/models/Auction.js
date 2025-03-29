
const mongoose = require('mongoose');

const AuctionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startingBid: {
    type: Number,
    required: true,
    min: 0
  },
  currentBid: {
    type: Number,
    default: function() {
      return this.startingBid;
    }
  },
  reservePrice: {
    type: Number,
    default: 0
  },
  featured: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    required: true,
    enum: ['Art', 'Electronics', 'Collectibles', 'Fashion', 'Home', 'Vehicles', 'Jewelry', 'Other']
  },
  startTime: {
    type: Date,
    default: Date.now
  },
  endTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['upcoming', 'active', 'ended', 'canceled'],
    default: 'upcoming'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for bids
AuctionSchema.virtual('bids', {
  ref: 'Bid',
  localField: '_id',
  foreignField: 'auction'
});

// Method to check if auction is active
AuctionSchema.methods.isActive = function() {
  const now = new Date();
  return now >= this.startTime && now <= this.endTime;
};

// Update auction status based on time
AuctionSchema.pre('find', function() {
  this.populate('creator', 'name email avatar');
});

module.exports = mongoose.model('Auction', AuctionSchema);
