import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Event, User, Filter } from '@/types';
import { mockEvents } from '@/data/mockEvents';

interface AppContextType {
  events: Event[];
  favorites: string[];
  registeredEvents: string[];
  user: User | null;
  filter: Filter;
  toggleFavorite: (eventId: string) => void;
  toggleRegistration: (eventId: string) => void;
  setFilter: (filter: Filter) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [filter, setFilterState] = useState<Filter>({
    category: 'All',
    dateRange: 'All',
    priceType: 'All',
  });
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    avatar: 'https://i.pravatar.cc/150?img=33',
  });

  const toggleFavorite = (eventId: string) => {
    setFavorites((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const toggleRegistration = (eventId: string) => {
    setRegisteredEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  };

  const login = (email: string, password: string) => {
    setUser({
      id: '1',
      name: 'Alex Morgan',
      email,
      avatar: 'https://i.pravatar.cc/150?img=33',
    });
  };

  const logout = () => {
    setUser(null);
    setFavorites([]);
    setRegisteredEvents([]);
  };

  return (
    <AppContext.Provider
      value={{
        events: mockEvents,
        favorites,
        registeredEvents,
        user,
        filter,
        toggleFavorite,
        toggleRegistration,
        setFilter: setFilterState,
        login,
        logout,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
