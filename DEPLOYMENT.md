# Deployment

This project is set up for:

- Frontend: Vercel
- Backend API: Render

## 1. Deploy the API on Render

Repository root already contains [`render.yaml`](/Users/Suhail/Documents/Dhayal_Sports_Acadamy-master/render.yaml).

Steps:

1. Push this repository to GitHub.
2. In Render, create a new Blueprint or Web Service from the repo.
3. Render will detect `render.yaml`.
4. Set these required environment variables in Render:
   - `ENQUIRY_TO`
   - `SMTP_USER`
   - `SMTP_PASS`
   - `SMTP_FROM`
5. Deploy.

Expected API URL example:

- `https://dayal-sports-academy-api.onrender.com`

## 2. Deploy the frontend on Vercel

Frontend app directory:

- [`artifacts/badminton-club`](/Users/Suhail/Documents/Dhayal_Sports_Acadamy-master/artifacts/badminton-club)

Vercel settings:

- Framework Preset: `Vite`
- Root Directory: `artifacts/badminton-club`
- Build Command: `pnpm build`
- Output Directory: `dist/public`

Required environment variable in Vercel:

- `VITE_API_BASE_URL=https://YOUR-RENDER-API-URL`

Optional:

- `BASE_PATH=/`

The frontend already includes [`vercel.json`](/Users/Suhail/Documents/Dhayal_Sports_Acadamy-master/artifacts/badminton-club/vercel.json) for SPA routing.

## 3. Share the site

Once Vercel finishes deployment, share the Vercel frontend URL with your friends.

The frontend will call the Render API for enquiry submissions.
