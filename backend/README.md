# Shivarpan Foundation – Admin Panel (Django)

This `backend/` folder contains a Django backend + admin panel to manage:
- Pages (Home/About/Services/Contact/etc.)
- Blog/Articles (draft/publish, featured image, tags/categories, SEO + social preview)
- Media Library (upload/search/reuse)
- Magazine Issues + Stories
- Projects/Portfolio
- Testimonials
- Contact form leads + CSV export
- Newsletter subscribers + CSV export
- SEO + `robots.txt` + `sitemap.xml`
- Basic visitor/pageview tracking for the dashboard

## Run locally
1. Install dependencies:
   - `pip install -r backend/requirements.txt`
2. Create database tables + admin user:
   - `python backend/manage.py makemigrations`
   - `python backend/manage.py migrate`
   - `python backend/manage.py createsuperuser`
3. Start server:
   - `python backend/manage.py runserver`

Admin panel: `http://127.0.0.1:8000/admin/`

Dynamic website pages (Django-rendered):
- Home: `http://127.0.0.1:8000/`
- Any Page by slug: `http://127.0.0.1:8000/<slug>/`
- Blog: `http://127.0.0.1:8000/blog/` and `http://127.0.0.1:8000/blog/<slug>/`
- Projects: `http://127.0.0.1:8000/projects/` and `http://127.0.0.1:8000/projects/<slug>/`
- Magazine: `http://127.0.0.1:8000/magazine/`
- Testimonials: `http://127.0.0.1:8000/testimonials/`

Public APIs (for website/frontend to consume):
- `GET /api/pages/`, `GET /api/pages/by-slug/<slug>/`
- `GET /api/articles/`, `GET /api/articles/by-slug/<slug>/`
- `GET /api/projects/`
- `GET /api/magazine/issues/`, `GET /api/magazine/stories/`
- `GET /api/homepage/`
- `POST /api/contact/`
- `POST /api/newsletter/subscribe/`

## React frontend (CORS)
If your React app runs on `http://localhost:8080/` (or Vite `5173` / CRA `3000`), CORS is already allowed in `backend/core/settings.py`.
After changing CORS settings, restart Django `runserver`.
