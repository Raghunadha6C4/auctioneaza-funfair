
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Badge } from '@/components/ui/badge';
import CountdownTimer from './CountdownTimer';

const AuctionCard = ({ auction }) => {
  const { currentUser } = useAuth();
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
    <Link 
      to={`/auction/${auction.id}`}
      className="group"
    >
      <div className="glass-card overflow-hidden h-full flex flex-col hover:shadow-medium transition-all duration-300 group-hover:translate-y-[-4px]">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <div className="image-container">
            <img
              src={auction.image}
              alt={auction.title}
              className={`w-full h-full object-cover transition-all duration-700 ${
                imageLoaded ? 'image-loaded' : 'image-loading'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
          </div>
          
          {auction.featured && (
            <Badge className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm text-foreground border hover:bg-background/90">
              Featured
            </Badge>
          )}
          
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="bg-white/90 backdrop-blur-sm text-foreground px-3 py-2 rounded-full inline-flex items-center text-sm font-medium">
              <CountdownTimer endTime={auction.endTime} />
            </div>
          </div>
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex-grow">
            <h3 className="font-medium text-lg mb-1 group-hover:text-primary transition-colors">
              {auction.title}
            </h3>
            <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
              {auction.description}
            </p>
          </div>
          
          <div className="mt-auto pt-4 border-t border-border">
            <div className="flex justify-between items-center">
              <div>
                <div className="text-xs text-muted-foreground mb-1">Current Bid</div>
                <div className="font-display font-semibold text-lg">
                  {formatCurrency(auction.currentBid)}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground mb-1">Bids</div>
                <div className="font-medium">{auction.bids.length}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AuctionCard;
