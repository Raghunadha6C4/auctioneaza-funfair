
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  
  // Effect for detecting scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <nav
      className={`glass-navbar transition-all duration-300 ${
        scrolled ? 'py-2 shadow-medium' : 'py-4'
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-display font-bold tracking-tight">
            Auction<span className="text-primary">Zen</span>
          </span>
        </Link>
        
        <div className="hidden md:flex space-x-8 font-medium">
          <Link
            to="/"
            className={`transition-colors hover:text-primary ${
              location.pathname === '/' ? 'text-primary font-semibold' : 'text-muted-foreground'
            }`}
          >
            Home
          </Link>
          <Link
            to="/explore"
            className={`transition-colors hover:text-primary ${
              location.pathname === '/explore' ? 'text-primary font-semibold' : 'text-muted-foreground'
            }`}
          >
            Explore
          </Link>
          <Link
            to="/how-it-works"
            className={`transition-colors hover:text-primary ${
              location.pathname === '/how-it-works' ? 'text-primary font-semibold' : 'text-muted-foreground'
            }`}
          >
            How It Works
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {currentUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative rounded-full h-8 w-8 p-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg" alt={currentUser.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {currentUser.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="glass-effect">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/my-bids">My Bids</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/my-listings">My Listings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild className="rounded-full px-6">
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
