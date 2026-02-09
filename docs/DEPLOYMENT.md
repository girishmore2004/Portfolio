# 🚀 Deployment Guide

Complete guide for deploying your Portfolio CMS to production.

---

## Prerequisites

- MongoDB Atlas account (free tier)
- Cloudinary account (free tier)
- Vercel account (for frontend)
- Railway/Render account (for backend)

---

## Step 1: Database Setup (MongoDB Atlas)

1. **Create Account:** Go to [mongodb.com/atlas](https://mongodb.com/atlas)

2. **Create Cluster:**
   - Click "Build a Database"
   - Choose FREE tier
   - Select region closest to your users
   - Click "Create"

3. **Configure Database Access:**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create username and password (save these!)
   - Grant "Atlas Admin" role

4. **Configure Network Access:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)

5. **Get Connection String:**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
   - Example: `mongodb+srv://user:pass@cluster.mongodb.net/portfolio-cms?retryWrites=true&w=majority`

---

## Step 2: Cloudinary Setup

1. **Sign Up:** [cloudinary.com](https://cloudinary.com)

2. **Get Credentials:**
   - Go to Dashboard
   - Note: Cloud Name, API Key, API Secret

3. **Optional - Create Upload Preset:**
   - Settings → Upload → Upload Presets
   - Create unsigned preset for easier uploads

---

## Step 3: Backend Deployment (Railway/Render)

### Option A: Railway

1. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   railway login
   ```

2. **Deploy:**
   ```bash
   cd backend
   railway init
   railway up
   ```

3. **Set Environment Variables:**
   ```bash
   railway variables set MONGODB_URI="your-mongodb-atlas-connection-string"
   railway variables set JWT_SECRET="your-random-secret-key"
   railway variables set CLOUDINARY_CLOUD_NAME="your-cloud-name"
   railway variables set CLOUDINARY_API_KEY="your-api-key"
   railway variables set CLOUDINARY_API_SECRET="your-api-secret"
   railway variables set CLIENT_URL="https://your-frontend-domain.vercel.app"
   railway variables set NODE_ENV="production"
   ```

4. **Run Seed (One Time):**
   ```bash
   railway run npm run seed
   ```

### Option B: Render

1. **Create Account:** [render.com](https://render.com)

2. **New Web Service:**
   - Connect your GitHub repository
   - Select backend folder
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Environment Variables:**
   Add all variables from Step 3 above in Render dashboard

4. **Deploy:**
   - Render auto-deploys on git push

---

## Step 4: Frontend Deployment (Vercel)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd frontend
   vercel
   ```

3. **Set Environment Variable:**
   - Go to Vercel dashboard → Your project → Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-url.railway.app/api`

4. **Redeploy:**
   ```bash
   vercel --prod
   ```

---

## Step 5: Initial Setup

1. **Access Your Portfolio:**
   - Visit: `https://your-portfolio.vercel.app`

2. **Login to Admin:**
   - Go to: `https://your-portfolio.vercel.app/login`
   - Use credentials from seed script

3. **Change Password:**
   - Go to Admin → Settings
   - Update your password

4. **Customize Content:**
   - Update hero section
   - Add your projects
   - Upload certifications
   - Add skills
   - Update contact info

---

## Environment Variables Reference

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://...
JWT_SECRET=random-secret-key-min-32-chars
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your-cloud
CLOUDINARY_API_KEY=123456789
CLOUDINARY_API_SECRET=abc123xyz
CLIENT_URL=https://your-frontend.vercel.app
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=SecurePassword123!
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend.railway.app/api
```

---

## Custom Domain Setup

### Vercel (Frontend)

1. **Add Domain:**
   - Vercel Dashboard → Domains
   - Add your domain
   - Update DNS records as shown

2. **Update Backend CORS:**
   - Add your domain to `CLIENT_URL` in backend env

### Railway (Backend)

1. **Generate Domain:**
   - Railway auto-generates `app.railway.app` subdomain

2. **Custom Domain (Pro Plan):**
   - Settings → Domains → Add Custom Domain

---

## Security Checklist

- [ ] Changed default admin password
- [ ] Used strong JWT_SECRET (32+ random characters)
- [ ] MongoDB Atlas has network access configured
- [ ] HTTPS enabled (automatic on Vercel/Railway)
- [ ] Environment variables set correctly
- [ ] CORS configured for your domain only
- [ ] Cloudinary upload limits configured

---

## Monitoring & Maintenance

### Logs
- **Railway:** Dashboard → Your Service → Logs
- **Render:** Dashboard → Your Service → Logs
- **Vercel:** Dashboard → Your Project → Deployments → View Logs

### Backups
```bash
# Export content
curl https://your-api.railway.app/api/export > backup.json

# Import content
curl -X POST https://your-api.railway.app/api/import \
  -H "Content-Type: application/json" \
  -d @backup.json
```

### Updates
```bash
# Backend
cd backend
git pull
railway up  # or git push for Render

# Frontend
cd frontend
git pull
vercel --prod
```

---

## Troubleshooting

### 502 Bad Gateway
- Check backend is running
- Verify environment variables
- Check Railway/Render logs

### CORS Errors
- Verify `CLIENT_URL` matches frontend URL exactly
- Check for http vs https mismatch

### MongoDB Connection Failed
- Verify connection string
- Check MongoDB Atlas network access
- Ensure password has no special characters or is URL-encoded

### Images Not Uploading
- Verify Cloudinary credentials
- Check Cloudinary upload limits
- Review browser console for errors

---

## Cost Breakdown (Free Tier Limits)

| Service | Free Tier | Upgrades |
|---------|-----------|----------|
| MongoDB Atlas | 512MB storage | $9/mo for 2GB |
| Cloudinary | 25GB storage, 25k transformations/mo | $89/mo for 75GB |
| Railway | $5/mo credit | $20/mo for more |
| Vercel | Unlimited bandwidth | $20/mo for team features |

**Total:** FREE for most personal portfolios!

---

## Performance Optimization

### Frontend
```bash
# Build optimized
npm run build

# Analyze bundle
npm install -g source-map-explorer
source-map-explorer dist/assets/*.js
```

### Backend
- Enable compression (already included)
- Add Redis caching for frequently accessed data
- Use CDN for static assets

### Database
- Create indexes on frequently queried fields
- Limit returned data with pagination
- Use MongoDB Atlas performance advisor

---

## Next Steps

1. Set up analytics (Google Analytics, Plausible)
2. Add sitemap.xml for SEO
3. Set up automated backups
4. Configure monitoring alerts
5. Add blog section (optional)

---

## Support Resources

- **MongoDB:** [docs.mongodb.com](https://docs.mongodb.com)
- **Cloudinary:** [cloudinary.com/documentation](https://cloudinary.com/documentation)
- **Railway:** [docs.railway.app](https://docs.railway.app)
- **Vercel:** [vercel.com/docs](https://vercel.com/docs)

---

**Congratulations! Your portfolio is now live! 🎉**