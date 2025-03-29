
const express = require('express');
const mongoose = require('mongoose');
const Auction = require('../models/Auction');
const Bid = require('../models/Bid');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all auctions with filtering
router.get('/', async (req, res) => {
  try {
    const { 
      featured, 
      category, 
      status, 
      limit = 20, 
      page = 1,
      sortBy = 'endTime',
      order = 'asc'
    } = req.query;
    
    const query = {};
    
    // Apply filters
    if (featured) query.featured = featured === 'true';
    if (category) query.category = category;
    if (status) query.status = status;
    
    // Update status based on current time
    const now = new Date();
    if (status === 'active') {
      query.startTime = { $lte: now };
      query.endTime = { $gte: now };
    } else if (status === 'upcoming') {
      query.startTime = { $gt: now };
    } else if (status === 'ended') {
      query.endTime = { $lt: now };
    }
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Sorting
    const sort = {};
    sort[sortBy] = order === 'desc' ? -1 : 1;
    
    const auctions = await Auction.find(query)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip)
      .populate('creator', 'name avatar');
    
    const total = await Auction.countDocuments(query);
    
    res.json({
      success: true,
      data: auctions,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get a single auction by ID
router.get('/:id', async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id)
      .populate('creator', 'name email avatar');
    
    if (!auction) {
      return res.status(404).json({ success: false, message: 'Auction not found' });
    }
    
    // Get bids for this auction
    const bids = await Bid.find({ auction: req.params.id })
      .sort({ amount: -1 })
      .populate('bidder', 'name avatar');
    
    res.json({
      success: true,
      data: {
        ...auction.toObject(),
        bids
      }
    });
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return res.status(400).json({ success: false, message: 'Invalid auction ID' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create a new auction
router.post('/', auth, async (req, res) => {
  try {
    const { 
      title, 
      description, 
      image, 
      startingBid, 
      reservePrice,
      category,
      endTime,
      startTime = new Date() 
    } = req.body;
    
    const auction = new Auction({
      title,
      description,
      image,
      creator: req.user._id,
      startingBid,
      currentBid: startingBid,
      reservePrice: reservePrice || startingBid,
      category,
      startTime,
      endTime,
      status: new Date() < new Date(startTime) ? 'upcoming' : 'active'
    });
    
    await auction.save();
    
    res.status(201).json({
      success: true,
      data: auction
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update an auction
router.put('/:id', auth, async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    
    if (!auction) {
      return res.status(404).json({ success: false, message: 'Auction not found' });
    }
    
    // Check if user is the creator
    if (auction.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this auction' });
    }
    
    // Check if auction has bids
    const hasBids = await Bid.exists({ auction: req.params.id });
    if (hasBids) {
      return res.status(400).json({ success: false, message: 'Cannot update auction with existing bids' });
    }
    
    const updates = req.body;
    const updatedAuction = await Auction.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    );
    
    res.json({
      success: true,
      data: updatedAuction
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete an auction
router.delete('/:id', auth, async (req, res) => {
  try {
    const auction = await Auction.findById(req.params.id);
    
    if (!auction) {
      return res.status(404).json({ success: false, message: 'Auction not found' });
    }
    
    // Check if user is the creator
    if (auction.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this auction' });
    }
    
    // Check if auction has bids
    const hasBids = await Bid.exists({ auction: req.params.id });
    if (hasBids) {
      return res.status(400).json({ success: false, message: 'Cannot delete auction with existing bids' });
    }
    
    await Auction.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Auction deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
