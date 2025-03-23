
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { toast } from "@/components/ui/use-toast";
import { useAuth } from '@/context/AuthContext';

const Profile = () => {
  const { currentUser, logout } = useAuth();
  
  // Redirect if not logged in
  if (!currentUser) {
    return <Navigate to="/auth" />;
  }
  
  // Mock user data
  const userData = {
    bids: [
      {
        id: '1',
        auctionId: '1',
        auctionTitle: 'Vintage Camera Collection',
        amount: 850,
        date: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
        status: 'highest',
      },
      {
        id: '2',
        auctionId: '3',
        auctionTitle: 'Antique Wooden Desk',
        amount: 1200,
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
        status: 'outbid',
      },
    ],
    listings: [
      {
        id: '5',
        title: 'Vintage Vinyl Records (1960s)',
        currentBid: 120,
        bids: 3,
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days from now
        status: 'active',
      },
    ],
    watchlist: [
      {
        id: '2',
        title: 'Luxury Watch Collection',
        currentBid: 4200,
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 12), // 12 hours from now
      },
      {
        id: '6',
        title: 'Modern Art Print, Limited Edition',
        currentBid: 580,
        endTime: new Date(Date.now() + 1000 * 60 * 60 * 36), // 36 hours from now
      },
    ],
  };
  
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    phone: '',
    address: '',
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated",
    });
  };
  
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation don't match",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Password updated",
      description: "Your password has been successfully updated",
    });
    
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };
  
  return (
    <div className="container px-4 py-8 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="md:w-64 space-y-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg" alt={currentUser.name} />
              <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                {currentUser.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-xl font-medium">{currentUser.name}</h2>
              <p className="text-muted-foreground">{currentUser.email}</p>
            </div>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
            <div className="glass-card p-4">
              <div className="text-sm text-muted-foreground">Active Bids</div>
              <div className="text-2xl font-medium">{userData.bids.length}</div>
            </div>
            
            <div className="glass-card p-4">
              <div className="text-sm text-muted-foreground">My Listings</div>
              <div className="text-2xl font-medium">{userData.listings.length}</div>
            </div>
            
            <div className="glass-card p-4">
              <div className="text-sm text-muted-foreground">Watchlist</div>
              <div className="text-2xl font-medium">{userData.watchlist.length}</div>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full"
            onClick={logout}
          >
            Sign Out
          </Button>
        </div>
        
        {/* Main content */}
        <div className="flex-1">
          <Tabs defaultValue="activity">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="payment">Payment</TabsTrigger>
            </TabsList>
            
            {/* Activity Tab */}
            <TabsContent value="activity" className="pt-6">
              <div className="space-y-8">
                {/* Bids section */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Your Bids</h3>
                  {userData.bids.length === 0 ? (
                    <p className="text-muted-foreground">You haven't placed any bids yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {userData.bids.map(bid => (
                        <div key={bid.id} className="glass-card p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{bid.auctionTitle}</h4>
                            <Badge
                              className={
                                bid.status === 'highest'
                                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                  : 'bg-red-100 text-red-800 hover:bg-red-200'
                              }
                            >
                              {bid.status === 'highest' ? 'Highest Bid' : 'Outbid'}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-muted-foreground text-sm">Your bid</p>
                              <p className="font-medium">{formatCurrency(bid.amount)}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-muted-foreground text-sm">Placed on</p>
                              <p>{formatDate(bid.date)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Listings section */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Your Listings</h3>
                  {userData.listings.length === 0 ? (
                    <p className="text-muted-foreground">You don't have any active listings.</p>
                  ) : (
                    <div className="space-y-3">
                      {userData.listings.map(listing => (
                        <div key={listing.id} className="glass-card p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{listing.title}</h4>
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                              {listing.status === 'active' ? 'Active' : 'Ended'}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-muted-foreground text-sm">Current bid</p>
                              <p className="font-medium">{formatCurrency(listing.currentBid)}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-muted-foreground text-sm">Bids</p>
                              <p>{listing.bids}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-muted-foreground text-sm">Ends</p>
                              <p>{formatDate(listing.endTime)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Watchlist section */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Your Watchlist</h3>
                  {userData.watchlist.length === 0 ? (
                    <p className="text-muted-foreground">You haven't added any items to your watchlist.</p>
                  ) : (
                    <div className="space-y-3">
                      {userData.watchlist.map(item => (
                        <div key={item.id} className="glass-card p-4">
                          <h4 className="font-medium mb-2">{item.title}</h4>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-muted-foreground text-sm">Current bid</p>
                              <p className="font-medium">{formatCurrency(item.currentBid)}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-muted-foreground text-sm">Ends</p>
                              <p>{formatDate(item.endTime)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            {/* Profile Tab */}
            <TabsContent value="profile" className="pt-6">
              <div className="glass-card p-6">
                <h3 className="text-lg font-medium mb-4">Profile Information</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(123) 456-7890"
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="address">Shipping Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="123 Main St, City, State, ZIP"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="rounded-full px-6">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </div>
            </TabsContent>
            
            {/* Security Tab */}
            <TabsContent value="security" className="pt-6">
              <div className="glass-card p-6">
                <h3 className="text-lg font-medium mb-4">Change Password</h3>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="rounded-full px-6">
                      Update Password
                    </Button>
                  </div>
                </form>
              </div>
            </TabsContent>
            
            {/* Payment Tab */}
            <TabsContent value="payment" className="pt-6">
              <div className="glass-card p-6">
                <h3 className="text-lg font-medium mb-4">Payment Methods</h3>
                <p className="text-muted-foreground mb-4">
                  Add a payment method to easily place bids and pay for won auctions.
                </p>
                
                <Button className="rounded-full px-6">
                  Add Payment Method
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
