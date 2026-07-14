# NARAYANIX Connect

Customer Experience & Business Process Solutions — marketing website + admin panel.

**Stack:** React 19 + Vite + TypeScript + Tailwind CSS (client) · Express 5 + MongoDB/Mongoose (server)

## Project structure

```
NARAYANIX-Connect/
├── client/     React frontend (public site + /admin panel)
└── server/     Express API + MongoDB models
```

## 1. Prerequisites

- Node.js 18+
- A MongoDB database — either a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster or a local `mongod` instance

## 2. Backend setup

```bash
cd server
npm install
```

Edit `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/narayanix-connect?retryWrites=true&w=majority
JWT_SECRET=<a long random string>
ADMIN_EMAIL=admin@narayanixconnect.com
ADMIN_PASSWORD=<choose a real password>
```

Create the first admin login and seed the site's default content (run once):

```bash
npm run seed
```

Start the API:

```bash
npm run dev      # with auto-reload (nodemon)
# or
npm start
```

The API runs at `http://localhost:5000`.

## 3. Frontend setup

```bash
cd client
npm install
npm run dev
```

The site runs at `http://localhost:5173`. `client/.env` already points at `http://localhost:5000` for local development — update `VITE_API_URL` there when you deploy the backend elsewhere.

## 4. Admin panel

Visit `http://localhost:5173/admin/login` and sign in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` you set before running `npm run seed`. From there you can:

- View dashboard stats and recent leads
- Manage Contact and Proposal submissions
- Edit company Settings (including logo/favicon upload) and website copy

**Change the seeded admin password** after your first login — there's currently no in-app "change password" screen, so update it directly by re-running the seed logic or via a database update if you need to rotate it.

## 5. Production build

```bash
cd client
npm run build   # outputs to client/dist
```

Deploy `client/dist` as a static site, and deploy `server/` as a Node service (Render, Railway, etc.), pointing `MONGODB_URI` at your production database and `VITE_API_URL` at that service's public URL.

## Notes

- Contact and Proposal form submissions are stored in MongoDB and shown in the admin panel.
- Optional email notifications: set `EMAIL_USER`, `EMAIL_PASS` (a Gmail address + [app password](https://myaccount.google.com/apppasswords)), and `ADMIN_NOTIFY_EMAIL` in `server/.env` to get emailed whenever a new contact/proposal comes in. Leave `EMAIL_USER` blank to disable.
- Uploaded logos/favicons are stored in `server/uploads/` and served at `/uploads/<file>`.
