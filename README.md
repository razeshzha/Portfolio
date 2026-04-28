# Next.js Fullstack Portfolio

Frontend and backend are in the same Next.js project.

## Features

- Next.js App Router frontend
- Backend API routes inside `src/app/api`
- MongoDB contact form save
- Profile API
- Projects API
- Tailwind CSS modern UI

## API Routes

- `GET /api/profile`
- `GET /api/projects`
- `POST /api/contact`
- `GET /api/contact`

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open:

```txt
http://localhost:3000
```

## MongoDB

In `.env.local`:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio_nextjs
```

For MongoDB Atlas, replace it with your Atlas connection URL.
