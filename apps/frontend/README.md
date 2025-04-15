# Frontend

React application for the Real Time Chat project.

## Commands

```bash
# Development
npx nx serve frontend

# Tests
npx nx test frontend

# Build
npx nx build frontend

# Lint
npx nx lint frontend
```

## Structure

```
src/
├── app/
│   ├── components/
│   ├── hooks/
│   └── utils/
├── assets/
├── styles/
└── main.tsx
```

## Testing

Test files should be placed next to the files they test:

```
Component.tsx
Component.spec.tsx
```

## Dependencies

- React 18
- Socket.IO Client
- Testing Library
- Jest
- SWC
