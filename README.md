# Fasco app

This workspace contains:

- `web/` React + Vite frontend
- `server/` Express + MongoDB backend

## Setup

1. Install dependencies for all packages
2. Seed the database
3. Start both apps in dev mode

## Development

- Frontend dev server: http://localhost:5173
- Backend API: http://localhost:5000
- Vite proxy forwards `/api/*` to the backend, so frontend uses relative `/api` baseURL.

## Environment

- MongoDB DB: `fascodb`
- Main collection: `fascocollection`
