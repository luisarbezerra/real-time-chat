# RealTimeChat

## Project Overview

RealTimeChat is a monorepo built with [Nx](https://nx.dev), featuring a React frontend and an Express backend using Socket.IO for real-time communication.

- ✨ [Tech Architecture & Technical Decisions](./doc/doc.md)
- ✨ [Scope and planning of the project](./doc/scope.md)

## Tech Stack

- **Frontend**: React
- **Backend**: Express.js with Socket.IO
- **Monorepo Management**: Nx
- **Package Manager**: pnpm (recommended)

## Prerequisites

Make sure you have the following installed:

- **Node.js**: v18 or higher
- **pnpm**: v8 or higher (recommended)

To install `pnpm` globally:

```bash
npm install -g pnpm
```

## Getting Started

1. **Clone the repository**:

```bash
git clone https://github.com/luisarbezerra/real-time-chat.git
cd real-time-chat
```

2. **Install dependencies**:

### Using pnpm (recommended):

```bash
pnpm install
```

## Run tasks

### Frontend Application

```bash
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

```bash
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

```bash
# Build the shared library
npx nx build shared

# Test the shared library
npx nx test shared

# Lint the shared library
npx nx lint shared
```

To see all available targets to run for a project, run:

```bash
npx nx show project <project-name>
```

## Development Workflow

1. Run the backend: `pnpm nx serve backend`
2. Run the frontend: `pnpm nx serve frontend`
3. Access the chat application at: [http://localhost:4200](http://localhost:4200)

## Project Structure

```
real-time-chat/
├── apps/
│   ├── frontend/        # React application
│   ├── frontend-e2e/    # E2E tests for frontend
│   └── backend/         # Express + Socket.IO server
├── libs/
└── └── shared/          # Shared types, utilities, and constants
```

## Troubleshooting

If you see this error:

```bash
NX   Could not find Nx modules in this workspace.
```

Make sure you’ve run the install step from the root of the project:

```bash
pnpm install
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).
