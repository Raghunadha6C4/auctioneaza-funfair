
const express = require('express');
const mongoose = require('mongoose');
const Bid = require('../models/Bid');
const Auction = require('../models/Auction');
const auth = require('../middleware/auth');

const router = express.Router();

// Get bids for an auction
router.get('/auction/:auctionId', async (req, res) => {
  try {
    const bids = await Bid.find({ auction: req.params.auctionId })
      .sort({ amount: -1 })
      .populate('bidder', 'name avatar');
    
    res.json({
      success: true,
      data: bids
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Place a bid
router.post('/', auth, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { auctionId, amount } = req.body;
    
    // Find the auction and lock it for update
    const auction = await Auction.findById(auctionId).session(session);
    
    if (!auction) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ success: false, message: 'Auction not found' });
    }
    
    // Check if auction is active
    const now = new Date();
    if (now < auction.startTime || now > auction.endTime) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ success: false, message: 'Auction is not active' });
    }
    
    // Check if bid amount is higher than current bid
    if (amount <= auction.currentBid) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ success: false, message: 'Bid amount must be higher than current bid' });
    }
    
    // Create the bid
    const bid = new Bid({
      auction: auctionId,
      bidder: req.user._id,
      amount
    });
    
    await bid.save({ session });
    
    // Update the auction's current bid
    auction.currentBid = amount;
    await auction.save({ session });
    
    await session.commitTransaction();
    session.endSession();
    
    // Populate bidder info
    await bid.populate('bidder', 'name avatar');
    
    res.status(201).json({
      success: true,
      data: bid
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user's bids
router.get('/my-bids', auth, async (req, res) => {
  try {
    const bids = await Bid.find({ bidder: req.user._id })
      .sort({ createdAt: -1 })
      .populate({
        path: 'auction',
        select: 'title image currentBid endTime status'
      });
    
    res.json({
      success: true,
      data: bids
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
