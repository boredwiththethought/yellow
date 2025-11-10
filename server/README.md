# Fasco Backend API

Simple Express + MongoDB API used by the frontend.

## Env

Create a `.env` from `.env.example` and adjust values if needed:

- MONGODB_URI: your MongoDB Atlas connection string
- MONGODB_DB: fascodb
- PORT: 5000

## Scripts

- dev: run with nodemon (ts)
- build: compile TS to dist
- start: run compiled JS

## Endpoints

- GET /api/health → { status: 'ok' }
- GET /api/items → list up to 100 docs from `fascocollection`
- POST /api/items → insert body as document
- DELETE /api/items/:id → delete by ObjectId

## Run locally

1. Install deps
2. Create .env
3. Start dev

Frontend expects baseURL http://localhost:5000/api
