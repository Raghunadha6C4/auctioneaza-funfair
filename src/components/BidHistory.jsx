
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';

const BidHistory = ({ bids }) => {
  const { currentUser } = useAuth();
  const [expanded, setExpanded] = useState(false);
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  const formatDate = (date) => {
    if (!date) return '';
    const dateObj = new Date(date);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(dateObj);
  };
  
  const displayBids = expanded ? bids : bids.slice(0, 3);
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Bid History</h3>
        <Badge variant="outline">{bids.length} Bids</Badge>
      </div>
      
      <div className="space-y-3">
        {displayBids.map((bid, index) => (
          <div
            key={bid.id}
            className={`p-4 rounded-lg flex items-center justify-between 
              ${index === 0 ? 'bg-primary/5 border border-primary/20' : 'bg-muted/20 border border-border'}`}
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={bid.bidderImage || '/placeholder.svg'} alt={bid.bidder} />
                <AvatarFallback>
                  {bid.bidder[0]}
                </AvatarFallback>
              </Avatar>
              
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">
                    {bid.bidder}
                  </span>
                  {currentUser && bid.bidder === currentUser.name && (
                    <Badge className="text-xs" variant="outline">You</Badge>
                  )}
                  {index === 0 && (
                    <Badge className="text-xs bg-primary/20 text-primary hover:bg-primary/30 border-none">
                      Highest Bid
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDate(bid.timestamp)}
                </span>
              </div>
            </div>
            
            <div className="font-display font-semibold">
              {formatCurrency(bid.amount)}
            </div>
          </div>
        ))}
      </div>
      
      {bids.length > 3 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
        >
          {expanded ? 'Show less' : `Show all ${bids.length} bids`}
        </button>
      )}
    </div>
  );
};

export default BidHistory;
