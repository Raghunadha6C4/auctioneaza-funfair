
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuction } from '@/context/AuctionContext';
import FeaturedAuction from '@/components/FeaturedAuction';
import AuctionCard from '@/components/AuctionCard';

const Index = () => {
  const { auctions, featuredAuctions, loading } = useAuction();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAuctions, setFilteredAuctions] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  
  const categories = [
    { id: "all", name: "All Categories" },
    { id: "art", name: "Art" },
    { id: "collectibles", name: "Collectibles" },
    { id: "electronics", name: "Electronics" },
    { id: "jewelry", name: "Jewelry" },
    { id: "furniture", name: "Furniture" }
  ];
  
  // Filter auctions based on search query and category
  useEffect(() => {
    const filtered = auctions.filter(auction => {
      const matchesSearch = auction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           auction.description.toLowerCase().includes(searchQuery.toLowerCase());
                           
      const matchesCategory = activeCategory === "all" || auction.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
    
    setFilteredAuctions(filtered);
  }, [auctions, searchQuery, activeCategory]);
  
  // Featured auction or loading skeleton
  const renderFeatured = () => {
    if (loading) {
      return (
        <div className="relative rounded-xl overflow-hidden min-h-[500px] md:min-h-[600px] bg-muted animate-pulse">
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12">
            <Skeleton className="h-8 w-32 mb-4" />
            <Skeleton className="h-12 w-3/4 mb-2" />
            <Skeleton className="h-6 w-1/2 mb-6" />
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 mb-6">
              <Skeleton className="h-12 w-44" />
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-32" />
            </div>
            <Skeleton className="h-12 w-36" />
          </div>
        </div>
      );
    }
    
    return featuredAuctions.length > 0 && (
      <FeaturedAuction auction={featuredAuctions[0]} />
    );
  };
  
  // Render auction cards or loading skeletons
  const renderAuctionGrid = () => {
    if (loading) {
      return Array(6).fill(0).map((_, index) => (
        <div key={index} className="glass-card h-full">
          <Skeleton className="aspect-[4/3] w-full rounded-t-lg" />
          <div className="p-5">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-2/3 mb-4" />
            <Skeleton className="h-px w-full my-4" />
            <div className="flex justify-between">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-16" />
            </div>
          </div>
        </div>
      ));
    }
    
    return filteredAuctions.map(auction => (
      <AuctionCard key={auction.id} auction={auction} />
    ));
  };
  
  return (
    <div className="animate-fade-in">
      {/* Hero/Featured Auction Section */}
      <div className="container px-4 py-6 md:py-10">
        {renderFeatured()}
      </div>
      
      {/* Category and Search Section */}
      <div className="container px-4 mt-8 md:mt-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className="rounded-full transition-all duration-300"
              >
                {category.name}
              </Button>
            ))}
          </div>
          
          <div className="w-full md:w-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search auctions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="md:w-[300px] pr-10 rounded-full"
              />
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Live Auctions Grid */}
      <div className="container px-4 mt-8">
        <h2 className="text-2xl font-display font-semibold mb-6">Live Auctions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderAuctionGrid()}
        </div>
        
        {!loading && filteredAuctions.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No auctions found</h3>
            <p className="text-muted-foreground mb-6">
              Try changing your search or filter criteria
            </p>
            <Button onClick={() => {
              setSearchQuery("");
              setActiveCategory("all");
            }}>
              Clear Filters
            </Button>
          </div>
        )}
        
        {!loading && filteredAuctions.length > 0 && filteredAuctions.length < auctions.length && (
          <div className="text-center mt-8">
            <Button variant="outline" className="rounded-full px-8" onClick={() => {
              setSearchQuery("");
              setActiveCategory("all");
            }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      
      {/* How It Works Section */}
      <div className="container px-4 mt-16 md:mt-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our auction platform is designed to be simple and transparent. Follow these steps to start bidding or selling.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="glass-card p-6 text-center">
            <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="h-8 w-8 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Create an Account</h3>
            <p className="text-muted-foreground">
              Sign up for free and set up your profile to start using all features of our platform.
            </p>
          </div>
          
          <div className="glass-card p-6 text-center">
            <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="h-8 w-8 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Find Auctions</h3>
            <p className="text-muted-foreground">
              Browse through our curated collection of auctions or search for specific items.
            </p>
          </div>
          
          <div className="glass-card p-6 text-center">
            <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="h-8 w-8 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Place Bids</h3>
            <p className="text-muted-foreground">
              Bid on items you're interested in and track your bids in real-time.
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <Button asChild className="rounded-full px-8">
            <Link to="/how-it-works">
              Learn More
            </Link>
          </Button>
        </div>
      </div>
      
      {/* Join Our Community Section */}
      <div className="container px-4 mt-16 md:mt-24 mb-16">
        <div className="rounded-xl overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5" />
          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center md:justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                Ready to Start?
              </h2>
              <p className="text-muted-foreground max-w-md">
                Join thousands of collectors and sellers on our platform and discover the joy of online auctions.
              </p>
            </div>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/auth">Create Account</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
