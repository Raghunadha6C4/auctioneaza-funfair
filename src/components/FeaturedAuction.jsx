
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import CountdownTimer from './CountdownTimer';

const FeaturedAuction = ({ auction }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="relative overflow-hidden rounded-xl min-h-[500px] md:min-h-[600px] w-full">
      <div className="absolute inset-0 image-container">
        <img
          src={auction.image}
          alt={auction.title}
          className={`w-full h-full object-cover transition-all duration-700 ${
            imageLoaded ? 'image-loaded' : 'image-loading'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80" />
      </div>
      
      <div className="absolute inset-0 p-6 md:p-12 flex flex-col justify-end">
        <Badge className="self-start mb-4 text-md px-4 py-1.5 bg-white/90 backdrop-blur-sm text-foreground font-medium">
          Featured Auction
        </Badge>
        
        <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-2">
          {auction.title}
        </h2>
        
        <p className="text-white/90 max-w-xl mb-6 text-balance text-lg">
          {auction.description}
        </p>
        
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-8 mb-6">
          <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full">
            <CountdownTimer endTime={auction.endTime} />
          </div>
          
          <div className="flex flex-col">
            <span className="text-white/70 text-sm mb-1">Current Bid</span>
            <span className="text-white font-display text-2xl font-semibold">
              {formatCurrency(auction.currentBid)}
            </span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-white/70 text-sm mb-1">Reserve Price</span>
            <span className="text-white font-display text-2xl font-semibold">
              {formatCurrency(auction.reservePrice)}
            </span>
          </div>
        </div>
        
        <Button asChild className="self-start rounded-full px-8 py-6 text-md transition-all duration-300 hover:scale-105">
          <Link to={`/auction/${auction.id}`}>
            Place Bid
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default FeaturedAuction;
