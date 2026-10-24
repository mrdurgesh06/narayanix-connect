# Deploying NARAYANIX Connect on Render

> Part of the project documentation. Read together with `docs/DATABASE.md`.
> **Never put real passwords in this file or in Git** — secrets live only in Render's *Environment* tab.

## 1. Architecture

| Part | Where | Notes |
|---|---|---|
| React site (`client/`) | Render **Static Site** (already deployed) | needs `VITE_API_URL` = the API's URL |
| API (`server/`, ASP.NET Core 8) | Render **Web Service**, language **Docker** | built from the root `Dockerfile` |
| Database | Azure SQL (shared, tables `nrx_con_*`) | already migrated from Visual Studio |

Render has no native .NET runtime, which is why the API is deployed with Docker.

> When the "SEO approach B" phase is built (ASP.NET Core also serving the React build), the static site
> will be replaced by this one service. Until then there are two Render services.

## 2. Before you start

1. The code is pushed to GitHub **without** secrets (`.gitignore` ignores `appsettings.json` and `.env`).
2. The Azure SQL tables exist (`Update-Database` was run from Visual Studio). The API does **not** migrate the
   database by itself.
3. Plan **region**: use the same region for the API as you prefer for latency (for visitors in India, Singapore is
   the closest). Note the region — it decides which outbound IP ranges you must allow in Azure.

## 3. Azure SQL firewall (the step that is easiest to forget)

Azure SQL only accepts connections from IPs listed in the server firewall. Render's outbound traffic comes from
ranges shared by all Render services in the region (not a single IP, and Render changed them in Nov 2025).

1. Create the web service first (section 4) so the **Outbound** list exists.
2. Render Dashboard → your API service → **Connect** (top right) → **Outbound** tab → copy the IP ranges.
3. Azure Portal → your SQL **server** → **Networking** → **Firewall rules** → add one rule per range
   (Azure needs *start IP* and *end IP*; a CIDR such as `a.b.c.0/24` runs from `a.b.c.0` to `a.b.c.255`).
4. Save. Keep your own PC's rule, otherwise Visual Studio cannot reach the database.

Notes:
- Do **not** use the "0.0.0.0 – 255.255.255.255" rule except for a very short test; it exposes the database to the
  whole internet (only the password would protect it).
- "Allow Azure services and resources to access this server" does **not** cover Render.
- Workspaces created before 23 Jan 2022 have **no fixed outbound IPs in the Oregon region**. In that case create the
  service in another region (e.g. Singapore). Static dedicated IPs exist but are a paid Render feature.

## 4. Create the API web service

Render Dashboard → **New → Web Service** → connect the GitHub repository, then:

| Field | Value |
|---|---|
| Language / Runtime | **Docker** |
| Branch | your main branch |
| Root Directory | *(leave empty)* |
| Dockerfile Path | `./Dockerfile` |
| Region | as decided above |
| Instance type | Free for a demo (see limits in section 8) |
| Health Check Path | `/api/health` (cheap; it does not touch the database) |

### Environment variables (Environment tab)

| Key | Value |
|---|---|
| `ASPNETCORE_ENVIRONMENT` | `Production` |
| `ConnectionStrings__Default` | the Azure SQL connection string (**secret**) |
| `Jwt__Secret` | a **new** random string, at least 32 characters (**secret**) |
| `Cors__AllowedOrigins__0` | your frontend URL, e.g. `https://narayanix-connect-frontend.onrender.com` (no trailing slash) |
| `Cors__AllowedOrigins__1` | optional: a second origin such as your custom domain |
| `Email__User`, `Email__Password`, `Email__NotifyTo` | optional: Gmail notifications (**secret**) |

Do **not** set `Seed__AdminEmail` / `Seed__AdminPassword`: the admin already exists in the database. (They are only
needed for a brand-new, empty database.) Generate the JWT secret with the PowerShell snippet in `README.md`.

## 5. Check the API

Open these in a browser (replace the host):

1. `https://<api-service>.onrender.com/api/health` → `{"success":true,"status":"ok"}`
2. `https://<api-service>.onrender.com/api/settings` → JSON with the company info. If this returns a 500 or hangs,
   the database is unreachable: check the Azure firewall (section 3), the connection string, or whether the free
   database is paused / out of free quota.
3. `https://<api-service>.onrender.com/api/website-content` → `{}` or your saved sections.

## 6. Point the frontend to the new API

1. Static Site → **Environment** → set `VITE_API_URL` to the API's URL, e.g. `https://<api-service>.onrender.com`
   (**no** trailing slash and **no** `/api`; the client adds `/api` itself).
2. **Manual Deploy → Deploy latest commit** (Vite bakes the value in at build time).
3. Test: public site pages, the Contact form, then `/admin/login` with your `NRXCON` login ID.

Order matters: the new frontend code calls `/api/...`, which only the new API understands. Deploy and test the API
first, then switch the frontend, then delete the old Node.js service.

## 7. Updating later

- **Code change:** push to GitHub; Render rebuilds automatically.
- **Database change (new migration):** run `Update-Database` from Visual Studio against the Azure database
  *before* deploying code that needs it.
- **Rotate a secret:** change it in Render's Environment tab (the service restarts). Changing `Jwt__Secret` logs
  everyone out.

## 8. Limits of the Free plan (read before going live)

- **Sleeps after 15 minutes without traffic.** The next request waits for a cold start (up to about a minute).
  If the Azure free database is paused as well, the first visitor can wait even longer.
- **Ephemeral disk:** files written by the API are lost on every redeploy, restart or spin-down. Logos/favicons
  uploaded from the admin Settings page will therefore disappear. Options: a Render persistent disk (paid) with
  `Uploads__Path` pointing at its mount path, cloud storage (Azure Blob), or hosting the images with the frontend
  and pasting their URLs.
- **750 free instance hours per month** per workspace; exceeding them suspends free services until next month.
- **Azure SQL free tier** has a monthly compute allowance (100,000 vCore-seconds). A site with real traffic, plus
  other websites sharing the same database, can exhaust it, after which the database is unavailable. Plan a paid
  tier before real launch.
- The API's global rate limit is 100 requests / 15 min / IP (login: 10 / 15 min). Behind Render the real client IP
  comes from `X-Forwarded-For` (already handled).

## 9. Troubleshooting

| Symptom | Likely cause / fix |
|---|---|
| Deploy fails: no open port detected | The container must listen on `$PORT` (the Dockerfile does this). Check the deploy log for a startup exception, usually a missing `ConnectionStrings__Default` or a `Jwt__Secret` shorter than 32 characters |
| `/api/health` works but `/api/settings` fails | Database unreachable: Azure firewall (section 3), connection string, paused DB / quota |
| Browser console shows a CORS error | `Cors__AllowedOrigins__0` must exactly match the frontend origin (scheme + host, no trailing slash) |
| Login says "Unable to log in right now" | Database unreachable (same as above) — see the service logs |
| Admin pages bounce back to login | `Jwt__Secret` changed, or the token expired; log in again |
| First request is very slow | Free-plan cold start (section 8) |
