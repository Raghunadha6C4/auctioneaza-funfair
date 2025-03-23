
import { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";
import { mockAuctions } from '@/lib/mockData';

const AuctionContext = createContext(null);

export function useAuction() {
  return useContext(AuctionContext);
}

export function AuctionProvider({ children }) {
  const [auctions, setAuctions] = useState([]);
  const [featuredAuctions, setFeaturedAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load initial auction data
  useEffect(() => {
    // In a real app, this would fetch from an API
    const loadAuctions = () => {
      setLoading(true);
      
      setTimeout(() => {
        setAuctions(mockAuctions);
        setFeaturedAuctions(mockAuctions.filter(auction => auction.featured));
        setLoading(false);
      }, 1000); // Simulate network delay
    };
    
    loadAuctions();
  }, []);

  // Place a bid
  const placeBid = (auctionId, amount) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // In a real app, this would be an API call
          const updatedAuctions = auctions.map(auction => {
            if (auction.id === auctionId) {
              if (amount <= auction.currentBid) {
                throw new Error("Bid must be higher than current bid");
              }
              
              const updatedAuction = {
                ...auction,
                currentBid: amount,
                bids: [
                  { 
                    id: Date.now().toString(),
                    amount,
                    bidder: 'Demo User',
                    timestamp: new Date()
                  },
                  ...auction.bids
                ]
              };
              return updatedAuction;
            }
            return auction;
          });
          
          setAuctions(updatedAuctions);
          
          // Also update featured auctions if needed
          const updatedFeatured = featuredAuctions.map(auction => {
            if (auction.id === auctionId) {
              return updatedAuctions.find(a => a.id === auctionId);
            }
            return auction;
          });
          
          setFeaturedAuctions(updatedFeatured);
          
          toast({
            title: "Bid placed!",
            description: `Your bid of $${amount} has been placed`,
          });
          
          resolve(amount);
        } catch (error) {
          toast({
            title: "Bid failed",
            description: error.message,
            variant: "destructive",
          });
          reject(error);
        }
      }, 800); // Simulate network delay
    });
  };

  // Get a single auction by ID
  const getAuction = (id) => {
    return auctions.find(auction => auction.id === id);
  };

  const value = {
    auctions,
    featuredAuctions,
    loading,
    placeBid,
    getAuction
  };

  return <AuctionContext.Provider value={value}>{children}</AuctionContext.Provider>;
}
