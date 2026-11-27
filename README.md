# Coworking Space Hub

A full-stack coworking-space browser built with React, Express, and simple in-memory data. Users can browse and filter spaces, save favourites in local storage, view details, and send inquiries to the backend API.

## Project structure

```text
frontend/  React and Vite application
backend/   Express API
```

## Run the backend

```bash
cd backend
npm install
npm start
```

The API runs at `http://localhost:3000`.

## Run the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs at `http://localhost:5173`.

## API routes

- `GET /health`
- `GET /api/spaces`
- `GET /api/spaces/:id`
- `GET /api/inquiries`
- `POST /api/inquiries`

Coworking-space data comes only from the backend. Inquiries are stored in memory and reset when the backend restarts. Saved-space IDs are stored in the browser's local storage.
