
// Mock auction data
export const mockAuctions = [
  {
    id: '1',
    title: 'Vintage Camera Collection',
    description: 'A rare collection of vintage cameras from the 1950s-1970s, including Leica, Canon, and Nikon models. All in working condition with original cases.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1496335621106-80b415e8410d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    ],
    currentBid: 850,
    reservePrice: 1000,
    category: 'collectibles',
    condition: 'Good',
    seller: 'VintageFinds',
    location: 'New York, NY',
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3), // 3 days from now
    featured: true,
    listedOn: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
    bids: [
      {
        id: '1-1',
        amount: 850,
        bidder: 'PhotoCollector',
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      },
      {
        id: '1-2',
        amount: 800,
        bidder: 'VintageHunter',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      },
      {
        id: '1-3',
        amount: 750,
        bidder: 'ClassicCamera',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      },
      {
        id: '1-4',
        amount: 700,
        bidder: 'RetroCollector',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
      }
    ],
    shipping: {
      description: 'Professionally packed with insurance included',
      cost: 25,
      estimatedDelivery: '3-5 business days'
    }
  },
  {
    id: '2',
    title: 'Luxury Watch Collection',
    description: 'A stunning collection of luxury watches including models from Rolex, Omega, and Tag Heuer. All authenticated with original boxes and papers.',
    image: 'https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1526045612212-70caf35c14df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1580287897608-dbbf6dfb9bdd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1613552465135-e5beff986c34?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1526748819166-62c449168e84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    ],
    currentBid: 4200,
    reservePrice: 5000,
    category: 'jewelry',
    condition: 'Excellent',
    seller: 'LuxuryTimePieces',
    location: 'Los Angeles, CA',
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days from now
    featured: false,
    listedOn: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    bids: [
      {
        id: '2-1',
        amount: 4200,
        bidder: 'WatchConnoisseur',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      },
      {
        id: '2-2',
        amount: 4000,
        bidder: 'TimePieceCollector',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      },
      {
        id: '2-3',
        amount: 3800,
        bidder: 'HorologistPro',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      }
    ],
    shipping: {
      description: 'Secure shipping with tracking and signature required',
      cost: 0,
      estimatedDelivery: '1-2 business days via express courier'
    }
  },
  {
    id: '3',
    title: 'Antique Wooden Desk',
    description: 'Beautiful 19th century mahogany writing desk with intricate carvings and original brass hardware. In excellent condition with minimal wear.',
    image: 'https://images.unsplash.com/photo-1519974719765-e6559eac2575?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1611486212557-88be5ff6f941?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    ],
    currentBid: 1200,
    reservePrice: 1500,
    category: 'furniture',
    condition: 'Excellent',
    seller: 'AntiqueFinds',
    location: 'Boston, MA',
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
    featured: false,
    listedOn: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    bids: [
      {
        id: '3-1',
        amount: 1200,
        bidder: 'VintageFurniture',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      },
      {
        id: '3-2',
        amount: 1150,
        bidder: 'Demo User',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
      },
      {
        id: '3-3',
        amount: 1100,
        bidder: 'ClassicInteriors',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 10), // 10 hours ago
      },
      {
        id: '3-4',
        amount: 1050,
        bidder: 'AntiqueLover',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      },
      {
        id: '3-5',
        amount: 1000,
        bidder: 'HistoryBuff',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 15), // 15 hours ago
      }
    ],
    shipping: {
      description: 'White glove delivery service with installation',
      cost: 150,
      estimatedDelivery: '7-10 business days'
    }
  },
  {
    id: '4',
    title: 'Rare First Edition Books',
    description: 'Collection of first edition books from renowned authors including Hemingway, Fitzgerald, and Steinbeck. All in excellent condition with minimal wear.',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1526243741027-444d633d7365?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    ],
    currentBid: 3200,
    reservePrice: 4000,
    category: 'collectibles',
    condition: 'Very Good',
    seller: 'RareBookCollector',
    location: 'Chicago, IL',
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4), // 4 days from now
    featured: false,
    listedOn: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6), // 6 days ago
    bids: [
      {
        id: '4-1',
        amount: 3200,
        bidder: 'BookWorm',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      },
      {
        id: '4-2',
        amount: 3100,
        bidder: 'LiteraryCollector',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      },
      {
        id: '4-3',
        amount: 3000,
        bidder: 'ClassicReader',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
      }
    ],
    shipping: {
      description: 'Professionally packed with acid-free materials and insurance',
      cost: 45,
      estimatedDelivery: '2-3 business days'
    }
  },
  {
    id: '5',
    title: 'Vintage Vinyl Records Collection',
    description: 'Impressive collection of vinyl records from the 1960s-1980s, including rare pressings from The Beatles, Led Zeppelin, and Pink Floyd. All in excellent playing condition.',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1603048588665-709f13b3d342?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1542208998-f6dbbb77740c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1619983081563-430f63602de6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    ],
    currentBid: 950,
    reservePrice: 1200,
    category: 'collectibles',
    condition: 'Good',
    seller: 'VinylEnthusiast',
    location: 'Seattle, WA',
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 6), // 6 days from now
    featured: true,
    listedOn: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    bids: [
      {
        id: '5-1',
        amount: 950,
        bidder: 'MusicCollector',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      },
      {
        id: '5-2',
        amount: 900,
        bidder: 'VinylHunter',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      },
      {
        id: '5-3',
        amount: 850,
        bidder: 'ClassicRockFan',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      }
    ],
    shipping: {
      description: 'Careful packaging in specialized vinyl mailers',
      cost: 15,
      estimatedDelivery: '3-5 business days'
    }
  },
  {
    id: '6',
    title: 'Modern Art Print, Limited Edition',
    description: 'Limited edition print by renowned contemporary artist, numbered and hand-signed. Includes certificate of authenticity and custom framing.',
    image: 'https://images.unsplash.com/photo-1554188248-986adbb73be4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1577083562582-891fa5f3a1ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1574182245530-967d9b3831af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    ],
    currentBid: 580,
    reservePrice: 800,
    category: 'art',
    condition: 'Mint',
    seller: 'GalleryModern',
    location: 'Miami, FL',
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days from now
    featured: false,
    listedOn: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4), // 4 days ago
    bids: [
      {
        id: '6-1',
        amount: 580,
        bidder: 'ArtConnoisseur',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1), // 1 hour ago
      },
      {
        id: '6-2',
        amount: 550,
        bidder: 'ArtCollector',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
      },
      {
        id: '6-3',
        amount: 520,
        bidder: 'GalleryOwner',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 9), // 9 hours ago
      },
      {
        id: '6-4',
        amount: 500,
        bidder: 'ModernArtLover',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 15), // 15 hours ago
      }
    ],
    shipping: {
      description: 'Specialized art shipping with insurance',
      cost: 75,
      estimatedDelivery: '5-7 business days'
    }
  },
  {
    id: '7',
    title: 'Premium SLR Camera Kit',
    description: 'Professional-grade DSLR camera with multiple lenses, tripod, and accessories. Perfect for professional photographers or serious enthusiasts.',
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1581591546539-744a66572em9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1616088886430-caaae40e56de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1617141636403-f511d48612cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    ],
    currentBid: 1650,
    reservePrice: 2000,
    category: 'electronics',
    condition: 'Like New',
    seller: 'ProPhotoGear',
    location: 'Denver, CO',
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 3.5), // 3.5 days from now
    featured: false,
    listedOn: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
    bids: [
      {
        id: '7-1',
        amount: 1650,
        bidder: 'PhotographyPro',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      },
      {
        id: '7-2',
        amount: 1600,
        bidder: 'CameraCollector',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      },
      {
        id: '7-3',
        amount: 1550,
        bidder: 'PhotoEnthusiast',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 10), // 10 hours ago
      }
    ],
    shipping: {
      description: 'Insured shipping with tracking',
      cost: 35,
      estimatedDelivery: '2-3 business days'
    }
  },
  {
    id: '8',
    title: 'Designer Handbag Collection',
    description: 'Curated collection of luxury designer handbags including Louis Vuitton, Chanel, and Hermès. All authenticated with original dust bags and care cards.',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1591561954557-26941169b49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1577083287735-526e1f234c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1575032617751-6ddec2089882?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80'
    ],
    currentBid: 5800,
    reservePrice: 7000,
    category: 'fashion',
    condition: 'Excellent',
    seller: 'LuxuryReseller',
    location: 'San Francisco, CA',
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 8), // 8 days from now
    featured: true,
    listedOn: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    bids: [
      {
        id: '8-1',
        amount: 5800,
        bidder: 'FashionCollector',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      },
      {
        id: '8-2',
        amount: 5600,
        bidder: 'StyleConnoisseur',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
      },
      {
        id: '8-3',
        amount: 5400,
        bidder: 'VintageFashion',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
      },
      {
        id: '8-4',
        amount: 5200,
        bidder: 'LuxuryBuyer',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
      }
    ],
    shipping: {
      description: 'Secure and discreet shipping with signature required',
      cost: 0,
      estimatedDelivery: '1-2 business days via premium courier'
    }
  }
];
