
const Auction = require('../models/Auction');

// Updates auction statuses based on current time
async function updateAuctionStatus() {
  const now = new Date();
  
  try {
    // Find upcoming auctions that should now be active
    await Auction.updateMany(
      { status: 'upcoming', startTime: { $lte: now } },
      { $set: { status: 'active' } }
    );
    
    // Find active auctions that should now be ended
    await Auction.updateMany(
      { status: 'active', endTime: { $lte: now } },
      { $set: { status: 'ended' } }
    );
    
    console.log('Auction statuses updated successfully');
  } catch (error) {
    console.error('Error updating auction statuses:', error);
  }
}

// If called directly
if (require.main === module) {
  const mongoose = require('mongoose');
  const dotenv = require('dotenv');
  
  dotenv.config();
  
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB');
      updateAuctionStatus()
        .then(() => {
          console.log('Status update complete');
          mongoose.disconnect();
        });
    })
    .catch(err => {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    });
}

module.exports = updateAuctionStatus;
