# Comments Component

A modern React component library for social interactions, featuring a sophisticated nested comment system, real-time updates, and local data persistence. Built with TypeScript, Vite, and RxDB for a seamless user experience.

## Features

- 🎯 Modular Component Architecture
- 🔄 Real-time Social Interactions
- 💾 Local Database Integration
- ⚡ Fast and Lightweight
- 🧪 Test Coverage

## Components

- `Post` - Display and manage social media posts
- `Comments` - Nested comment system with replies
- `Likes` - Like/unlike functionality
- `Author` - User information display
- `CommentInput` - Interactive comment creation
- `IconWrapper` - Reusable icon container
- `Button` - Customizable button component

## Tech Stack

- React
- TypeScript
- Vite
- Vitest for Testing
- RxDB for Local Database
- TailwindCSS for Styling

## Project Structure

```
src/
  ├── dataLayer/       # Database and data management
  ├── serviceLayer/    # Business logic and hooks
  ├── viewLayer/       # UI components and views
  ├── types/          # TypeScript type definitions
  └── utils/          # Utility functions and helpers
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## Architecture

The project follows a three-layer architecture:

- **Data Layer**: Manages database operations and data persistence
- **Service Layer**: Contains business logic and custom hooks
- **View Layer**: Handles UI components and user interactions
