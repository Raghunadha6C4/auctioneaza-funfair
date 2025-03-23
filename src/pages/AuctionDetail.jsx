
import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { toast } from "@/components/ui/use-toast";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuction } from '@/context/AuctionContext';
import { useAuth } from '@/context/AuthContext';
import CountdownTimer from '@/components/CountdownTimer';
import BidHistory from '@/components/BidHistory';

const AuctionDetail = () => {
  const { id } = useParams();
  const { getAuction, placeBid, loading: auctionsLoading } = useAuction();
  const { currentUser } = useAuth();
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [isPlacingBid, setIsPlacingBid] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [redirect, setRedirect] = useState(false);
  
  useEffect(() => {
    if (!auctionsLoading) {
      const foundAuction = getAuction(id);
      if (foundAuction) {
        setAuction(foundAuction);
        // Initialize bid amount to minimum next bid
        setBidAmount((foundAuction.currentBid + 1).toString());
      } else {
        setRedirect(true);
      }
    }
  }, [id, getAuction, auctionsLoading]);
  
  if (redirect) {
    return <Navigate to="/" />;
  }
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  const handleBidSubmit = async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast({
        title: "Authentication required",
        description: "Please sign in to place a bid",
        variant: "destructive",
      });
      return;
    }
    
    const bidAmountNum = parseFloat(bidAmount);
    
    if (isNaN(bidAmountNum) || bidAmountNum <= auction.currentBid) {
      toast({
        title: "Invalid bid amount",
        description: `Your bid must be higher than ${formatCurrency(auction.currentBid)}`,
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsPlacingBid(true);
      await placeBid(auction.id, bidAmountNum);
      
      // Update local auction state
      setAuction(prev => ({
        ...prev,
        currentBid: bidAmountNum,
        bids: [
          {
            id: Date.now().toString(),
            amount: bidAmountNum,
            bidder: currentUser.name,
            timestamp: new Date()
          },
          ...prev.bids
        ]
      }));
      
    } catch (error) {
      toast({
        title: "Bid failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsPlacingBid(false);
    }
  };
  
  // Loading skeleton
  if (auctionsLoading || !auction) {
    return (
      <div className="container px-4 py-8 animate-fade-in">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton className="h-[400px] w-full rounded-lg" />
            <div className="grid grid-cols-4 gap-2">
              {Array(4).fill(0).map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-md" />
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-5 w-1/2 mb-6" />
            </div>
            
            <div className="p-4 border rounded-lg">
              <Skeleton className="h-6 w-40 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
            
            <div className="space-y-2">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
            
            <Skeleton className="h-6 w-32 mb-2" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container px-4 py-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column - Images */}
        <div className="space-y-4">
          <div className="rounded-lg overflow-hidden border border-border">
            <AspectRatio ratio={4/3} className="bg-muted">
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
            </AspectRatio>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {auction.gallery?.map((img, index) => (
              <div key={index} className="rounded-md overflow-hidden border border-border">
                <AspectRatio ratio={1/1}>
                  <img
                    src={img}
                    alt={`${auction.title} gallery ${index + 1}`}
                    className="w-full h-full object-cover hover:opacity-80 transition-opacity cursor-pointer"
                  />
                </AspectRatio>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right column - Auction details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-display font-bold">{auction.title}</h1>
            <p className="text-muted-foreground">
              Listed by <span className="font-medium">{auction.seller}</span>
            </p>
          </div>
          
          <div className="glass-card p-4">
            <p className="font-medium mb-2">Auction ends in:</p>
            <CountdownTimer endTime={auction.endTime} />
          </div>
          
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-8">
              <div>
                <p className="text-sm text-muted-foreground">Current Bid</p>
                <p className="text-2xl font-display font-semibold">
                  {formatCurrency(auction.currentBid)}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Reserve Price</p>
                <p className="text-xl font-medium">
                  {formatCurrency(auction.reservePrice)}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground">Bids</p>
                <p className="text-xl font-medium">{auction.bids.length}</p>
              </div>
            </div>
            
            <form onSubmit={handleBidSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bidAmount">Your Bid Amount</Label>
                <div className="flex space-x-2">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-muted-foreground">$</span>
                    </div>
                    <Input
                      id="bidAmount"
                      type="number"
                      min={auction.currentBid + 1}
                      step="1"
                      placeholder="Enter amount"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isPlacingBid || !currentUser}
                    className="rounded-full px-6"
                  >
                    {isPlacingBid ? "Placing Bid..." : "Place Bid"}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Minimum bid: {formatCurrency(auction.currentBid + 1)}
                </p>
              </div>
            </form>
          </div>
          
          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="history">Bid History</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-4 pt-4">
              <p>{auction.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium">Category</h4>
                  <p className="text-muted-foreground">{auction.category}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Condition</h4>
                  <p className="text-muted-foreground">{auction.condition}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Location</h4>
                  <p className="text-muted-foreground">{auction.location}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Listed On</h4>
                  <p className="text-muted-foreground">
                    {new Date(auction.listedOn).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="pt-4">
              <ScrollArea className="h-[300px] rounded-md">
                <BidHistory bids={auction.bids} />
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="shipping" className="pt-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">Shipping Information</h4>
                  <p className="text-muted-foreground">
                    {auction.shipping.description}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">Shipping Cost</h4>
                  <p className="text-muted-foreground">
                    {auction.shipping.cost === 0 
                      ? "Free Shipping" 
                      : formatCurrency(auction.shipping.cost)
                    }
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium">Estimated Delivery</h4>
                  <p className="text-muted-foreground">{auction.shipping.estimatedDelivery}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {/* Related auctions section */}
      <div className="mt-16">
        <h2 className="text-2xl font-display font-semibold mb-6">Similar Auctions</h2>
        {/* Related auctions would go here */}
      </div>
    </div>
  );
};

export default AuctionDetail;
