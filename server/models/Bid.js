
const mongoose = require('mongoose');

const BidSchema = new mongoose.Schema({
  auction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Auction',
    required: true
  },
  bidder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Ensure the bid is higher than the current highest bid
BidSchema.pre('save', async function(next) {
  try {
    if (this.isNew) {
      const Auction = mongoose.model('Auction');
      const auction = await Auction.findById(this.auction);
      
      if (!auction) {
        throw new Error('Auction not found');
      }
      
      if (!auction.isActive()) {
        throw new Error('Auction is not active');
      }
      
      if (this.amount <= auction.currentBid) {
        throw new Error('Bid amount must be higher than current bid');
      }
      
      // Update the auction's current bid
      auction.currentBid = this.amount;
      await auction.save();
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Bid', BidSchema);
