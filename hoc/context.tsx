'use client';
import { createContext, useContext, useState } from 'react';

const UserContext = createContext<any>(null);
// const useUserInfo = useContext(UserContext);

// Custom hook to use UserContext
const getUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserInfo must be used within a UserProvider');
  }
  return context;
};

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider, getUser };
