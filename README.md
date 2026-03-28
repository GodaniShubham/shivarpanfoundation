# Shivarpan Foundation Website

React + TypeScript + Vite project for Shivarpan Foundation.

## Setup

```sh
npm install
```

## Development

```sh
npm run dev
```

## Build

```sh
npm run build
```

## Test

```sh
npm run test
```

## Render Deploy

This repo is set up for two Render services:

1. `shivarpan-frontend` as a static site
2. `shivarpan-backend` as a web service

The included `render.yaml` contains the recommended defaults for both services.

### Frontend

- Root directory: repository root
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Env var: `VITE_API_BASE_URL=https://<your-backend-domain>/api`

### Backend

- Root directory: `backend`
- Build command: `pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput`
- Start command: `gunicorn core.wsgi:application --bind 0.0.0.0:$PORT`

Recommended backend env vars:

- `DJANGO_SECRET_KEY`
- `DJANGO_DEBUG=0`
- `DJANGO_ALLOWED_HOSTS=<your-backend-domain>`
- `DJANGO_CORS_ALLOWED_ORIGINS=https://<your-frontend-domain>`
- `DJANGO_CSRF_TRUSTED_ORIGINS=https://<your-frontend-domain>`
- `DJANGO_DB_PATH=/var/data/db.sqlite3`
- `DJANGO_MEDIA_ROOT=/var/data/media`

If you keep SQLite and uploaded media on Render, attach a persistent disk and use the above paths.
