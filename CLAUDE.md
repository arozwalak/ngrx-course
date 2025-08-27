# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
This is an Angular v20 application demonstrating NgRx state management patterns, including NgRx Data, Effects, Entity, and Store. It's part of the "Ngrx (with NgRx Data) - The Complete Guide" course by Angular University.

## Architecture
- **Frontend**: Angular v20 with TypeScript
- **State Management**: NgRx v20 (Store, Effects, Entity, Data, Router Store)
- **UI Framework**: Angular Material v20
- **Backend**: Express.js REST API server
- **Development**: Node.js 22 LTS recommended

## Key Modules & Structure
```
src/app/
├── app.module.ts                 # Root module with NgRx store setup
├── auth/                         # Authentication feature module
│   ├── auth.module.ts           # Lazy-loaded auth module
│   ├── auth.actions.ts          # NgRx actions for auth
│   ├── auth.selectors.ts        # NgRx selectors
│   ├── auth.guard.ts            # Route guard
│   └── reducers/index.ts        # Auth state reducer
├── courses/                     # Courses feature module (lazy-loaded)
│   ├── courses.module.ts        # Feature module with NgRx Data
│   ├── model/                   # Domain models (Course, Lesson)
│   ├── services/                # HTTP services
│   └── components/              # UI components
└── courses/reducers/index.ts    # Root reducers with router state
```

## Available Commands

### Development
- `npm start` - Start Angular dev server at http://localhost:4200
- `npm run server` - Start Express backend at http://localhost:9000
- `npm run build` - Build for production
- `npm run lint` - Run TSLint
- `npm test` - Run unit tests with Karma
- `npm run e2e` - Run end-to-end tests with Protractor

### NgRx Tools
- Store Devtools available at http://localhost:4200 (Redux DevTools extension)
- Router state synced with NgRx Router Store
- Entity and Data modules configured for courses/lessons

## NgRx Architecture Patterns

### State Structure
- Root state: `AppState` interface in `courses/reducers/index.ts`
- Auth state: `AuthState` in `auth/reducers/index.ts`
- Router state: Automatically synced via `@ngrx/router-store`

### Key NgRx Features Used
- **Store**: Central state management
- **Effects**: Side effect management for async operations
- **Entity**: Normalized state for collections
- **Data**: Automatic CRUD operations for entities
- **Router Store**: URL state synchronization
- **Store Devtools**: Development debugging

### Feature Modules
- **Auth Module**: Authentication state, login/logout actions
- **Courses Module**: Course/lesson management with NgRx Data

## Network Configuration
- Proxy config: `proxy.json` forwards `/api` to backend server
- Backend runs on port 9000, frontend on port 4200