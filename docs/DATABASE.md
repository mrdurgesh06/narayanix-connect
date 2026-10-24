# NARAYANIX Connect — Database & Project Rules

> **Purpose of this file:** single source of truth for the database design and project
> conventions. If you (or an AI assistant in a new chat) continue this project, read this
> file first. Keep it updated at the end of every phase.
>
> **Never put secrets in this file** (passwords, connection strings with credentials, JWT
> secrets, app passwords). Use placeholders only.

---

## 1. Project overview

| Item | Value |
|---|---|
| Product | NARAYANIX Connect — BPO / customer-experience marketing website + admin panel |
| Frontend | React 19 + Vite + TypeScript + Tailwind CSS 4 (`client/`) |
| Backend | **ASP.NET Core 8 Web API** (Controllers) + **Entity Framework Core 8** (`server/`); it also serves the built React app (`client/dist`) and injects SEO tags server-side (see §8.3) |
| Database | Microsoft SQL Server (Azure SQL Database), **shared with other websites** |
| History | Migrated from MERN (Express 5 + Mongoose/MongoDB). The old Node backend is removed; no MongoDB data is migrated (fresh start). |
| IDE | Visual Studio 2022 (17.8+ required for .NET 8) |

The React client keeps the **same API contract** the Node backend had (routes and JSON
shapes), so the client needs no changes except where a feature is new.

---

## 2. Shared-database rules (IMPORTANT)

This database is used by more than one website. Every object belongs to exactly one site,
identified by its **prefix**.

| Site | Prefix |
|---|---|
| NARAYANIX Connect (this project) | `nrx_con_` |
| _(next website)_ | _(choose a unique prefix, add it here first)_ |

Rules:

1. **Every** table, index, constraint and EF migrations-history table of this project starts
   with `nrx_con_` (constraints: after their type prefix, see §3).
2. Never create, alter, or query another site's prefixed objects from this project.
3. Register a new prefix in the table above **before** creating its first table.
4. Use a **separate SQL login/user per website**, with permissions only on its own objects.
5. EF Core's default `__EFMigrationsHistory` table is **not** used; this project uses
   `nrx_con_migrations_history` so sites cannot clash.
6. Azure SQL free tier: the database can auto-pause when idle (first connection may be slow
   or fail) and the monthly compute allowance is **shared by all sites** using it. The API
   must use EF connection resiliency (retry on failure). The Azure SQL server firewall must
   allow the developer IP and the hosting provider's outbound IPs.

---

## 3. Naming conventions

| Object | Rule | Example |
|---|---|---|
| Table | `nrx_con_` + **singular**, lowercase, words separated by `_` | `nrx_con_admin`, `nrx_con_website_content` |
| Column | **PascalCase** (no table prefix) | `Id`, `PasswordHash`, `CreatedAt` |
| Primary key column | `Id`, `INT IDENTITY(1,1)` | — |
| Primary key constraint | `PK_` + table | `PK_nrx_con_admin` |
| Unique index | `UQ_` + table + `_` + column (EF creates a unique index) | `UQ_nrx_con_admin_Email` |
| Index | `IX_` + table + `_` + column(s) | `IX_nrx_con_contact_CreatedAt` |
| Default values | applied **in code** (C# property initialisers), not as database default constraints, so there are no `DF_` objects | — |
| Check constraint | `CK_` + table + `_` + rule | `CK_nrx_con_setting_Singleton` |
| Foreign key (future) | `FK_` + child table + `_` + parent table | — |
| Timestamps | `CreatedAt`, `UpdatedAt` — `DATETIME2`, **UTC** (`SYSUTCDATETIME()`) | — |
| Text | `NVARCHAR` (Unicode, Hindi/English content) | — |

Exceptions (documented on purpose):
- `nrx_con_setting` is a singleton table: `Id` is **not** identity, it is always `1`
  (`CK_nrx_con_setting_Singleton`: `Id = 1`).
- `nrx_con_migrations_history` is managed by EF Core and keeps EF's own column names
  (`MigrationId`, `ProductVersion`).

C# entity properties use normal .NET PascalCase (`CreatedAt`); table and column names are
set explicitly in the EF Core fluent configuration (never rely on EF's pluralising defaults).

---

## 4. Tables (draft — finalise lengths when each is implemented)

> Column lengths below are the **draft**. They are confirmed against the real form fields
> while implementing Phase 1. Update this section when they change.

### 4.1 `nrx_con_admin` — admin panel users (Super Admins and Staff)
| Column | Type | Null | Notes |
|---|---|---|---|
| Id | INT IDENTITY | NO | PK |
| UserCode | VARCHAR(20) | NO | **Login ID**, e.g. `NRXCON0001`. Persisted computed column derived from `Id` (`NRXCON` + 4 digits, more digits after 9999); unique index `UQ_nrx_con_admin_UserCode`; never set from code, never reused |
| Name | NVARCHAR(100) | NO | defaults to `'Administrator'` in code |
| Email | NVARCHAR(256) | YES | optional contact email, lowercase; unique among non-NULL values (filtered unique index `UQ_nrx_con_admin_Email`) |
| PasswordHash | NVARCHAR(255) | NO | BCrypt hash, never returned by the API |
| Role | NVARCHAR(30) | NO | `SuperAdmin` or `Staff` |
| IsActive | BIT | NO | `0` = account disabled (cut off immediately) |
| MustChangePassword | BIT | NO | `1` for new / reset accounts until the user sets their own password |
| CreatedAt / UpdatedAt | DATETIME2 | NO | UTC |

### 4.2 `nrx_con_contact` — Contact page submissions
| Column | Type | Null | Notes |
|---|---|---|---|
| Id | INT IDENTITY | NO | PK |
| Name | NVARCHAR(150) | NO | |
| Company | NVARCHAR(200) | NO | default `''` |
| Email | NVARCHAR(256) | NO | lowercase + trimmed |
| Phone | NVARCHAR(30) | NO | |
| Message | NVARCHAR(4000) | NO | |
| CreatedAt / UpdatedAt | DATETIME2 | NO | UTC; index on `CreatedAt` |

### 4.3 `nrx_con_proposal` — "Get Proposal" submissions
| Column | Type | Null | Notes |
|---|---|---|---|
| Id | INT IDENTITY | NO | PK |
| Company | NVARCHAR(200) | NO | |
| Name | NVARCHAR(150) | NO | |
| Email | NVARCHAR(256) | NO | lowercase + trimmed |
| Phone | NVARCHAR(30) | NO | |
| Website | NVARCHAR(500) | NO | default `''` |
| Service | NVARCHAR(150) | NO | |
| Budget | NVARCHAR(100) | NO | default `''` |
| Message | NVARCHAR(4000) | NO | |
| CreatedAt / UpdatedAt | DATETIME2 | NO | UTC; index on `CreatedAt` |

### 4.4 `nrx_con_setting` — site settings (singleton, one row, `Id = 1`)
All columns `NOT NULL` (empty string when unused), plus `CreatedAt` / `UpdatedAt`.

| Column | Type | Column | Type |
|---|---|---|---|
| CompanyName | NVARCHAR(200) | Instagram | NVARCHAR(500) |
| Email | NVARCHAR(256) | Youtube | NVARCHAR(500) |
| Phone | NVARCHAR(50) | Whatsapp | NVARCHAR(200) |
| Address | NVARCHAR(500) | Copyright | NVARCHAR(200) |
| WorkingHours | NVARCHAR(200) | GoogleMap | NVARCHAR(MAX) (embed snippet) |
| Logo | NVARCHAR(500) | Analytics | NVARCHAR(MAX) (script snippet) |
| Favicon | NVARCHAR(500) | Facebook | NVARCHAR(500) |
| Linkedin | NVARCHAR(500) | | |

`Id` is not identity and is always `1` (`CK_nrx_con_setting_Singleton`). The row is created
at startup by the seeder (and on first read if missing). The API accepts only these
whitelisted fields on save (no mass assignment of `Id`, `CreatedAt`, `UpdatedAt`).

### 4.5 `nrx_con_website_content` — editable website text (one row per section)
| Column | Type | Null | Notes |
|---|---|---|---|
| Id | INT IDENTITY | NO | PK |
| SectionKey | NVARCHAR(100) | NO | unique, e.g. `home.hero`, `home.stats`, `faq.items`, `about.coreValues` |
| ContentJson | NVARCHAR(MAX) | NO | `CK_nrx_con_website_content_ContentJson`: `ISJSON([ContentJson]) = 1`; must be a JSON **object**, max 64 KB (enforced by the API) |
| CreatedAt / UpdatedAt | DATETIME2 | NO | UTC |

Design rules for website content:
- **One section = one row**; arrays (FAQ items, service cards, steps) live inside the JSON.
- **Item counts are fixed by the page layout** (e.g. Services = 5 cards); the admin edits text
  and icons of the existing items but cannot add/remove items.
- **Icons are stored by name** (a string such as `"Headphones"`) chosen from a curated list of
  lucide icons; the component maps the name to the icon component and falls back to its
  default icon if the name is unknown.
- **Defaults live in one place:** `client/src/content/defaults.ts` is used both by the public
  components (fallback) and by the admin editor (initial form values).
- **Hardcoded text in the component is the fallback** when the API fails, the DB is paused,
  or the section row does not exist.
- Demo chart numbers (`interactionsOverTime`, `channelDistribution`, `sentiment`, Hero
  `sparkline`) are not editable.
- The admin panel gets a **generic section editor** (form generated from the JSON shape).

### 4.6 `nrx_con_migrations_history`
EF Core migrations history (see §2 rule 5).

### 4.7 `nrx_con_admin_permission` — permissions ticked for a Staff user
| Column | Type | Null | Notes |
|---|---|---|---|
| Id | INT IDENTITY | NO | PK |
| AdminId | INT | NO | FK `FK_nrx_con_admin_permission_nrx_con_admin` → `nrx_con_admin.Id`, **ON DELETE CASCADE** |
| PermissionKey | NVARCHAR(50) | NO | e.g. `contacts.view`; unique together with `AdminId` (`UQ_nrx_con_admin_permission_AdminId_PermissionKey`) |
| CreatedAt / UpdatedAt | DATETIME2 | NO | UTC |

Super Admins have no rows here: they implicitly have every permission.

---

## 5. API contract (same routes and JSON shapes as the old Node API, under the `/api` prefix)

All routes below are served under `/api` (e.g. `POST /api/contact`) because the .NET app
also serves the React pages (§8.3) and several old routes (`/admin/dashboard`,
`/admin/contacts`, `/contact`, ...) were also React routes. Client impact: one line in
`client/src/api/api.ts` (`baseURL` = `VITE_API_URL` + `/api`). `/uploads/*` is unchanged.
Extra: `GET /api/health` returns `{ success: true, status: "ok" }`; unknown `/api/*` routes
return a JSON 404 (`API Route Not Found`).

| Method & route | Auth | Notes |
|---|---|---|
| `POST /contact` | public | validates required fields, stores, emails admin (best effort) |
| `POST /proposal` | public | same pattern |
| `POST /admin/login` | public | body `{ loginId, password }` (`loginId` = `NRXCON0001`; the old `email` field and email login still work); returns `{ success, token, admin }` where `admin` includes `userCode`, `role`, `mustChangePassword`, `permissions[]`; strict rate limit |
| `GET /admin/me` | any admin | current user incl. `permissions[]` |
| `POST /admin/change-password` | any admin | `{ currentPassword, newPassword }`; clears `MustChangePassword`; wrong current password → 400 (not 401) |
| `GET /admin/dashboard` | any admin | totals/latest 5 only for the contacts/proposals the user may view |
| `GET /admin/contacts` | `contacts.view` | |
| `DELETE /admin/contacts/:id` | `contacts.delete` | |
| `GET /admin/proposals` | `proposals.view` | |
| `DELETE /admin/proposals/:id` | `proposals.delete` | |
| `GET /admin/users/permissions` | Super Admin | checkbox catalog (`key`, `label`, `group`) |
| `GET /admin/users` | Super Admin | all users with role, status, permissions |
| `POST /admin/users` | Super Admin | create user `{ name, email?, password, role, permissions[] }` → returns the new `userCode` |
| `PUT /admin/users/:id` | Super Admin | update name, email, role, `isActive`, `permissions[]` |
| `POST /admin/users/:id/reset-password` | Super Admin | `{ newPassword }`; user must change it at next login |
| `DELETE /admin/users/:id` | Super Admin | |
| `GET /settings` | public | |
| `POST /settings` | `settings.edit` | whitelisted fields only |
| `POST /upload/:type` (`logo` \| `favicon`) | `settings.edit` | image only, max 5 MB, served from `/uploads` |
| `GET /website-content` | public | all saved sections as `{ "home.hero": {...}, ... }` (cached 60 s); unsaved sections are absent |
| `GET /admin/website-content` | `content.edit` | saved sections with `updatedAt` |
| `PUT /admin/website-content/{sectionKey}` | `content.edit` | body = the section's JSON object (create or replace) |
| `DELETE /admin/website-content/{sectionKey}` | `content.edit` | reset the section to its built-in defaults |

Conventions: JSON is camelCase; `id` is serialised as a **string**; errors use
`{ success: false, message }`; JWT in `Authorization: Bearer <token>`.

### 5.1 Users, roles and permissions

- **Login ID:** every admin-panel user has a login ID `NRXCON` + number (`NRXCON0001`, `NRXCON0002`, ...),
  generated by the database from the row `Id`. The seeded first admin is `NRXCON0001` if it is the first row.
- **Roles:** `SuperAdmin` (all permissions + the only role that can manage users) and `Staff`
  (only the permissions ticked for them). User management is intentionally **not** a checkbox.
- **Permissions (checkboxes):** `contacts.view`, `contacts.delete`, `proposals.view`, `proposals.delete`,
  `content.edit`, `settings.edit`. *Delete implies view.* The list lives in
  `server/.../Security/PermissionCatalog.cs` — add new permissions there only.
- **Enforced on the server** with `[RequirePermission(...)]` / `[RequireSuperAdmin]`; the client only hides
  what the user may not use. The user's active flag, role and permissions are re-read from the database on
  **every request**, so disabling a user or changing permissions takes effect immediately.
- **Creating a user:** the Super Admin enters name, optional email, a temporary password and ticks the
  permissions; the system shows the new login ID, which the Super Admin hands to the staff member. The user
  must set their own password at first login (`MustChangePassword`); until then only `me` and
  `change-password` work.
- **Password rules:** 8-100 characters with at least one letter and one number (BCrypt hashed).
- **Admin UI:** `client/src/admin/AdminAuthContext.tsx` loads the signed-in user (`GET /admin/me`) once per
  page load; the sidebar, route guards (`RequireAccess`) and Delete buttons use it only to *hide* what the user
  may not use. Changes made to a logged-in user's permissions reach their UI on the next page reload, while the
  server applies them immediately. The Users page (`Users.tsx`) is Super Admin only and shows a new user's
  login ID + temporary password once (`CredentialsModal`).
- **Safeguards:** nobody can change their own role, deactivate or delete themselves, and the last active
  Super Admin cannot be removed, demoted or deactivated. Accounts created before roles existed: the seeder
  promotes the oldest account to Super Admin.

---

## 6. Configuration & secrets

- **Development:** Visual Studio → right-click the API project → *Manage User Secrets*.
- **Production:** environment variables (double underscore = section separator).
- `appsettings.json` is committed and contains **only non-secret** settings and empty
  placeholders.

| Key (user-secrets / env var) | Purpose |
|---|---|
| `ConnectionStrings:Default` / `ConnectionStrings__Default` | SQL Server connection string |
| `Jwt:Secret`, `Jwt:ExpiresInDays` | JWT signing key and lifetime |
| `Seed:AdminEmail`, `Seed:AdminPassword` | first **Super Admin** (**no default password**; if missing, no admin is created and a warning is logged). The email is only a contact address; the login ID is `NRXCON0001` |
| `Email:User`, `Email:Password`, `Email:NotifyTo` | Gmail SMTP user, app password and notification address (`Email:Host`/`Email:Port` default to `smtp.gmail.com`/`587`). If any of the three is empty, notification emails are skipped. |
| `Cors:AllowedOrigins` | allowed frontend origins (array: in env vars use `Cors__AllowedOrigins__0`, `Cors__AllowedOrigins__1`, ...; setting them **replaces** the defaults in `appsettings.json` index by index) |
| `Uploads:Path` | optional folder for uploaded logo/favicon (default: `uploads/` next to the API; many hosts have an ephemeral disk, so point this at persistent storage in production) |

Connection string template (never commit real values):

```
Server=tcp:<server>.database.windows.net,1433;Initial Catalog=<database>;Persist Security Info=False;
User ID=<user>;Password=<from user-secrets>;MultipleActiveResultSets=False;Encrypt=True;
TrustServerCertificate=False;Connection Timeout=30;
```

---

## 7. Migrations workflow (Visual Studio 2022)

Tables are created **only** through EF Core code-first migrations (never hand-edit the DB
schema). In *Package Manager Console* (Default project = the API project):

```
Add-Migration <MigrationName>
Update-Database
```

Optional: `Script-Migration` to export a `.sql` file for review.

`AppDbContextFactory` (design-time factory) lets these commands run without starting the web
app; it reads `appsettings.json`, user-secrets and environment variables, so the connection
string must be set in user-secrets first. The API seeds the first admin and the settings row
on startup (after the tables exist).

---

## 8. Admin access & SEO requirements

### 8.1 Admin must not be reachable from the public UI
- No visible link/button to the admin area anywhere in the public site (the existing
  "Admin Login" link in `Footer.tsx` is removed).
- The login page opens only by typing the URL (`/admin/login`).
- `robots.txt` disallows `/admin`; admin pages send `noindex` (meta + `X-Robots-Tag`).
- Hiding the link is **not** security. Real protection: JWT, hashed passwords, strict
  rate limit on `/admin/login`, HTTPS only.

### 8.2 SEO ("strong, perfect SEO") — requirements
- Unique `<title>`, meta description, canonical URL per page.
- Absolute-URL Open Graph / Twitter images (current `og:image` is a missing relative path).
- JSON-LD structured data (Organization, WebSite, Service/FAQPage where applicable).
- `sitemap.xml` and `robots.txt`; clean 404 handling.
- Semantic headings (one `h1` per page), image `alt` text, descriptive link text.
- Performance (Core Web Vitals): current hero/favicon PNGs are 1.4–2.1 MB each — convert to
  optimised WebP/AVIF and remove duplicates.
- **Rendering approach (decided): server-side injection of SEO tags by ASP.NET Core** — see
  §8.3. The page body is still rendered by React in the browser; Googlebot renders it, and
  all per-route tags/structured data are already present in the raw HTML.

### 8.3 SEO approach B — how it works
- ASP.NET Core serves `client/dist` (static assets) and, for every public SPA route, returns
  `index.html` with placeholders filled **per route** from the database: `<title>`, meta
  description, canonical, robots, Open Graph, Twitter tags and JSON-LD.
- Per-route SEO data is stored in `nrx_con_website_content` as sections named
  `seo.<route>` (e.g. `seo.home`, `seo.services`, `seo.faq`), editable from the admin panel
  like any other section; sensible built-in defaults are used when a row is missing.
- `GET /sitemap.xml` and `GET /robots.txt` are generated dynamically (robots disallows
  `/admin` and `/api`).
- Unknown public URLs return a real **HTTP 404** (not a 200 with a React "not found" page).
- `/admin/*` pages are served with `noindex` (meta tag + `X-Robots-Tag` header).
- Known limit: the visible body text is rendered client-side. If needed later, build-time
  prerendering can be added on top without changing this design.

---

## 9. Status

| Phase | Scope | Status |
|---|---|---|
| 0 | Design & decisions (this file) | in review |
| 1 | .NET 8 API + EF Core + tables `admin/contact/proposal/setting`; connect React (`/api` prefix); remove Node `server/`; remove public admin link | **code delivered — awaiting build, migration and test on the developer's machine** |
| 1b | Roles, staff users, per-user permissions, login ID `NRXCON####`, change-password (1b-i backend, 1b-ii admin UI) | 1b-i backend delivered and migrated; **1b-ii admin UI delivered — awaiting test** (Login by ID, Users page, Change Password, permission-aware sidebar/routes) |
| Deploy | Render: Docker web service for the API + existing Static Site for React; Azure SQL firewall for Render's outbound ranges | files delivered (`Dockerfile`, `docs/DEPLOY_RENDER.md`) — awaiting deployment |
| 2 | `nrx_con_website_content` + API + admin section editor + Home sections (2a: backend table + API, 2b: client defaults/context/Home sections, 2c: admin editor) | **2a code delivered (needs migration `AddWebsiteContent`)**; 2b, 2c not started |
| 3 | Remaining pages (About, Services, Industries, FAQ, Contact, Proposal, Footer, menus) | not started |
| SEO | Server-side SEO injection (approach B), per-page meta, sitemap/robots, image optimisation | approach decided, not started |

---

## 10. Open decisions

1. **Production domain** for canonical/OG/sitemap URLs (`index.html` currently assumes
   `https://www.narayanixconnect.com/`).
2. Prefix and permissions for the next website sharing this database.

Resolved: SEO rendering approach → server-side injection by ASP.NET Core (§8.3); `/api` prefix for all API routes (§5); hosting → Render (API as a Docker web service, React as a Static Site until SEO approach B merges them into one service) — see `docs/DEPLOY_RENDER.md`.

---

## 11. Working agreement for continuing in a new chat

- Language: Hinglish (Hindi + English) is fine for discussion; code and docs in English.
- **Read the actual code before changing anything**; do not guess.
- Work **incrementally**: small steps, review checkpoint after each, minimal diffs; ask
  before each change; show only the changed portions where possible.
- Prefer modifying the existing codebase over rewriting it.
- Preserve backend/server-control attributes in existing markup.
- Shared stylesheets: append-only, never edit existing rules.
- Push back (with evidence) on assumptions instead of silently going along.
- The AI sandbox used so far has **no .NET SDK and no NuGet access**: code cannot be
  compiled there. The developer builds locally in Visual Studio 2022 and reports errors.
