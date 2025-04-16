# RealTimeChat

- ✨ [TechArchitecture & Technical Decisions](./doc/doc.md) ✨
- ✨ [Scope and planning of the project ✨](./doc/scope.md)

## Project Overview

RealTimeChat is a monorepo containing a React frontend and an Express backend with Socket.IO for real-time communication.

### Applications

- **Frontend**: React application for the chat interface
- **Backend**: Express application with Socket.IO for real-time messaging
- **Shared**: Common library with shared types and utilities

## Run tasks

### Frontend Application

```sh
# Start the development server
npx nx serve frontend

# Build for production
npx nx build frontend

# Run tests
npx nx test frontend

# Lint code
npx nx lint frontend
```

### Backend Application

```sh
# Start the development server
npx nx serve backend

# Build for production
npx nx build backend

# Run tests
npx nx test backend

# Lint code
npx nx lint backend
```

### Shared Library

```sh
# Build the shared library
npx nx build shared

# Test the shared library
npx nx test shared

# Lint the shared library
npx nx lint shared
```

To see all available targets to run for a project, run:

```sh
npx nx show project <project-name>
```

## Project Structure

```
├── apps/
│   ├── frontend/        # React application
│   ├── frontend-e2e/    # E2E tests for frontend
│   └── backend/         # Express + Socket.IO server
├── libs/
│   └── shared/          # Shared types, utilities, and constants
```

## Development Workflow

1. Run the backend: `npx nx serve backend`
2. Run the frontend: `npx nx serve frontend`
3. Access the chat application at http://localhost:4200
