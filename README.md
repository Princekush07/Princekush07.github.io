# Prince Kushwaha — Portfolio

Personal portfolio site aligned with your DevOps-focused resume. Built with **React + Vite**, responsive for mobile and tablet.

## Run locally

```powershell
cd "d:\Skill-up Project\portfolio"
npm install
npm run dev
```

Open the URL shown in the terminal (usually http://localhost:5173).

## Production build

```powershell
npm run build
npm run preview
```

Output is in `dist/` — deploy that folder to Netlify, Vercel, or Azure Static Web Apps.

## Customize content

Edit `src/data/content.js` (bio, projects, experience, links). Profile photo: `public/profile.jpg`.

## GitHub Pages URL (like [sunny-dev007.github.io](https://sunny-dev007.github.io/))

Your resume GitHub is **Princekush07**, so the clean personal URL is:

**https://princekush07.github.io/**

### Option A — Recommended (user site)

1. On GitHub, create a **public** repo named exactly **`Princekush07.github.io`** (must match your username).
2. Copy only the `portfolio` folder contents into that repo (or push this project’s `portfolio/` as the repo root).
3. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Copy `.github/workflows/portfolio-pages.yml` into that repo (adjust paths if the repo root *is* the portfolio — set `working-directory` to `.` and `path` to `dist`).
5. Push to `main`. After the workflow finishes, the site is live at **https://princekush07.github.io/**.

Favicon and header use a **PK** monogram (`public/favicon.svg`).

### Option B — From this monorepo (`Skill-up-project`)

1. Push to **prince-git007/Skill-up-project** (or your fork).
2. **Settings → Pages → GitHub Actions** on that repo.
3. Add a repository variable **`PORTFOLIO_BASE_PATH`** = `/Skill-up-project/` (repo name, with leading and trailing slashes).
4. Site URL: **https://prince-git007.github.io/Skill-up-project/**

Local build for project-site base path:

```powershell
$env:VITE_BASE_PATH="/Skill-up-project/"
npm run build
```

## Deploy on Netlify (example)

1. Push this `portfolio` folder to GitHub (or connect the repo).
2. Netlify → **Add site** → import repo.
3. **Base directory:** `portfolio` (if repo root is Skill-up Project) or leave blank if repo is only portfolio.
4. **Build command:** `npm run build`
5. **Publish directory:** `dist`
