
const express = require('express');
const User = require('../models/User');
const Auction = require('../models/Auction');
const Bid = require('../models/Bid');
const auth = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update user profile
router.put('/profile', auth, async (req, res) => {
  try {
    const { name, avatar } = req.body;
    
    const updates = {};
    if (name) updates.name = name;
    if (avatar) updates.avatar = avatar;
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true }
    ).select('-password');
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user's auctions
router.get('/my-auctions', auth, async (req, res) => {
  try {
    const auctions = await Auction.find({ creator: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: auctions
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add auction to watchlist
router.post('/watchlist/:auctionId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    // Check if auction exists
    const auction = await Auction.findById(req.params.auctionId);
    if (!auction) {
      return res.status(404).json({ success: false, message: 'Auction not found' });
    }
    
    // Check if already in watchlist
    if (user.watchlist.includes(req.params.auctionId)) {
      return res.status(400).json({ success: false, message: 'Auction already in watchlist' });
    }
    
    user.watchlist.push(req.params.auctionId);
    await user.save();
    
    res.json({
      success: true,
      data: user.watchlist
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Remove auction from watchlist
router.delete('/watchlist/:auctionId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    // Remove from watchlist
    user.watchlist = user.watchlist.filter(
      id => id.toString() !== req.params.auctionId
    );
    
    await user.save();
    
    res.json({
      success: true,
      data: user.watchlist
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get watchlist
router.get('/watchlist', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('watchlist');
    
    res.json({
      success: true,
      data: user.watchlist
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
