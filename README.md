# CityPulse - Local Event Discovery App

A beautiful, modern mobile application for discovering and managing local events.

## Features

- **Event Discovery**: Browse events with advanced filtering by category, date, and price
- **Search**: Find events by title, description, or location
- **Favorites**: Save events you're interested in
- **Event Registration**: Register for events and manage your registrations
- **Event Details**: View comprehensive event information including maps, organizers, and attendees
- **User Profile**: Manage your account and view statistics

## Tech Stack

- React Native (Expo)
- TypeScript
- Expo Router (File-based routing)
- Context API (State management)
- Lucide Icons

## Project Structure

```
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx      # Tab navigation configuration
│   │   ├── index.tsx         # Discover screen (home)
│   │   ├── favorites.tsx     # Favorites screen
│   │   ├── my-events.tsx     # Registered events screen
│   │   └── profile.tsx       # User profile screen
│   └── _layout.tsx           # Root layout
├── components/
│   ├── EventCard.tsx         # Reusable event card component
│   └── FilterBar.tsx         # Filter and category selection
├── contexts/
│   └── AppContext.tsx        # Global state management
├── data/
│   └── mockEvents.ts         # Mock event data
└── types/
    └── index.ts              # TypeScript type definitions
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for web:
   ```bash
   npm run build:web
   ```

## Customization

### Adding Events
Edit `data/mockEvents.ts` to add, remove, or modify events.

### Changing Colors
The app uses a blue color scheme. To change:
- Primary: `#3B82F6`
- Success: `#10B981`
- Error: `#EF4444`

Search and replace these values in component stylesheets.

### Adding Categories
1. Update the `EventCategory` type in `types/index.ts`
2. Add the new category to the `categories` array in `components/FilterBar.tsx`
3. Add a color for the category in `getCategoryColor()` function

## Notes

- All data is stored in memory using Context API
- No backend connection required
- Images are loaded from Pexels
- User authentication is simulated
