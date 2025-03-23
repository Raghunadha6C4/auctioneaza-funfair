
import { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";

const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing user session on mount
  useEffect(() => {
    const user = localStorage.getItem('auctionUser');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
    setLoading(false);
  }, []);

  // Mock signup function
  const signup = (email, password, name) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // In a real app, this would be an API call
          const user = { id: Date.now().toString(), email, name, createdAt: new Date() };
          localStorage.setItem('auctionUser', JSON.stringify(user));
          setCurrentUser(user);
          
          toast({
            title: "Account created",
            description: "Welcome to Auction Platform!",
          });
          
          resolve(user);
        } catch (error) {
          reject(error);
        }
      }, 800); // Simulate network delay
    });
  };

  // Mock login function
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          // In a real app, this would be an API call
          if (email === 'demo@example.com' && password === 'password') {
            const user = { 
              id: '123456', 
              email, 
              name: 'Demo User',
              createdAt: new Date()
            };
            localStorage.setItem('auctionUser', JSON.stringify(user));
            setCurrentUser(user);
            
            toast({
              title: "Welcome back",
              description: "Successfully logged in",
            });
            
            resolve(user);
          } else {
            reject(new Error('Invalid email or password'));
          }
        } catch (error) {
          reject(error);
        }
      }, 800); // Simulate network delay
    });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('auctionUser');
    setCurrentUser(null);
    toast({
      title: "Logged out",
      description: "You've been successfully logged out",
    });
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
