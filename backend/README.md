# Bandhu Backend (placeholder)

This folder contains a minimal Express backend scaffold and example API endpoints.

To run locally:

```sh
cd backend
cp .env.example .env
# edit .env and set MONGODB_URI to your Atlas connection string
npm install
npm run dev
# then open http://localhost:3001/api/health
```

API endpoints (examples):
- `GET /api/health` — health check
- `POST /api/users` — insert user document (JSON body, `email` required)
- `GET /api/users` — list users (optional `?email=` filter)

Add routes, middleware and DB config under `src/` as needed.
