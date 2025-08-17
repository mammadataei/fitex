# Fitex Dashboard

A modern campaign management and analytics platform built with React, TypeScript, and Vite. This application provides a comprehensive dashboard for managing marketing campaigns and visualizing their performance data.

## Features

- 📊 **Analytics Dashboard**: View campaign performance with interactive charts
- 🎯 **Campaign Management**: Create and manage marketing campaigns
- 📈 **Data Visualization**: Beautiful charts using Recharts library
- 💾 **Local Storage**: Persistent data storage in browser
- 🎨 **Modern UI**: Built with shadcn/ui and Tailwind CSS
- ⚡ **Fast Development**: Vite with Hot Module Replacement
- 🧪 **End-to-End Testing**: Playwright test suite
- 🔍 **Type Safety**: Full TypeScript support with Zod validation

## Tech Stack

- **Frontend Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4.1
- **UI Components**: shadcn/ui with Radix UI primitives
- **Charts**: Recharts
- **State Management**: TanStack React Query
- **Form Validation**: Zod
- **Testing**: Playwright
- **Package Manager**: pnpm
- **Code Quality**: ESLint + Prettier

## Project Structure

```
src/
├── api/                    # API layer and data fetching
│   ├── hooks/             # React Query hooks
│   ├── services/          # Data services (localStorage)
│   ├── index.ts          # API exports
│   ├── queryClient.ts    # React Query configuration
│   └── QueryProvider.tsx # Query provider component
├── components/            # React components
│   ├── campaign/         # Campaign-related components
│   ├── overview/         # Dashboard overview components
│   ├── ui/              # Reusable UI components (shadcn/ui)
│   └── error-boundary.tsx
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and validation
├── types/               # TypeScript type definitions
└── assets/             # Static assets
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

1. Clone the repository.
2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build the application for production
- `pnpm preview` - Preview the production build locally
- `pnpm lint` - Run ESLint for code linting
- `pnpm format` - Format code with Prettier

## Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing ESLint and Prettier configuration
- Use functional components with hooks
- Implement proper error boundaries

### Component Creation

- Place components in appropriate directories (`components/`)
- Use TypeScript interfaces for props
- Include JSDoc comments for complex logic
- Follow the existing naming conventions

### Adding New Features

1. Define TypeScript types in `src/types/`
2. Create API hooks in `src/api/hooks/`
3. Build components in `src/components/`
4. Add tests in `tests/`
5. Update this documentation

## Browser Support

The application supports modern browsers with ES2020+ features:

- Chrome 88+
- Firefox 88+
- Safari 14+
- Edge 88+

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## Performance Considerations

- Lazy loading with React Suspense
- React Query for efficient data caching
- Vite for fast development and optimized builds
- Chart data memoization to prevent unnecessary re-renders
