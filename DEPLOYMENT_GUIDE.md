# Classic Royal Printers - Deployment Guide

## Git Setup and Vercel Deployment

### Prerequisites
- Git installed on your system
- GitHub account
- Vercel account (free tier available)
- Node.js (v14 or higher)
- MongoDB Atlas account (for production database)

### Step 1: Initialize Git Repository

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Classic Royal Printers web application"
```

### Step 2: Create GitHub Repository

1. Go to GitHub and create a new repository named `classic-royal-printers`
2. Don't initialize with README, .gitignore, or license (we already have these)
3. Copy the repository URL

### Step 3: Push to GitHub

```bash
# Add remote origin
git remote add origin https://github.com/YOUR_USERNAME/classic-royal-printers.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Environment Variables Setup

#### For Production (Vercel)
You'll need to set these environment variables in Vercel dashboard:

**Backend Environment Variables:**
```
JWT_SECRET=your_secure_jwt_secret_here_change_this
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/classic_royal
NODE_ENV=production
FRONTEND_URL=https://your-vercel-app.vercel.app
```

**Frontend Environment Variables:**
```
REACT_APP_API_URL=
```
(Leave empty for production - it will use relative URLs)

### Step 5: MongoDB Atlas Setup

1. Create a MongoDB Atlas account
2. Create a new cluster
3. Create a database user
4. Whitelist Vercel's IP addresses (or use 0.0.0.0/0 for all IPs)
5. Get your connection string
6. Replace the MONGODB_URI in environment variables

### Step 6: Deploy to Vercel

#### Option A: Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect the configuration from `vercel.json`
5. Add environment variables in the "Environment Variables" section
6. Click "Deploy"

#### Option B: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts and add environment variables when asked
```

### Step 7: Post-Deployment Configuration

1. **Update CORS settings**: Update `FRONTEND_URL` in backend environment variables with your actual Vercel URL
2. **Test all functionality**: 
   - User registration/login
   - File uploads
   - Contact form
   - All pages load correctly

### Project Structure for Vercel

```
├── vercel.json              # Vercel configuration
├── .gitignore              # Git ignore rules
├── backend/                # Express.js API
│   ├── app.js             # Main server file
│   ├── package.json       # Backend dependencies
│   ├── .env               # Environment variables (not in git)
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── uploads/           # File upload directories
└── frontend/              # React application
    ├── package.json       # Frontend dependencies
    ├── .env.production    # Production environment
    ├── public/            # Static assets
    └── src/               # React source code
```

### Important Notes

1. **File Uploads**: In production, uploaded files are stored in Vercel's serverless functions, which are ephemeral. Consider using cloud storage (AWS S3, Cloudinary) for persistent file storage.

2. **Database**: The app is configured to work with MongoDB Atlas for production.

3. **Environment Variables**: Never commit `.env` files to Git. Always use Vercel's environment variable settings.

4. **API Routes**: All API routes are automatically handled by Vercel through the `vercel.json` configuration.

### Troubleshooting

#### Build Errors
- Check that all dependencies are listed in `package.json`
- Ensure environment variables are set correctly
- Check Vercel build logs for specific errors

#### Runtime Errors
- Check Vercel function logs
- Verify MongoDB connection string
- Ensure all environment variables are set

#### CORS Issues
- Update `FRONTEND_URL` in backend environment variables
- Check that the frontend URL matches your Vercel deployment URL

### Updating the Deployment

To update your deployment:

```bash
# Make your changes
git add .
git commit -m "Your commit message"
git push origin main
```

Vercel will automatically redeploy when you push to the main branch.

### Local Development

For local development, the app will continue to use `localhost:5000` for the backend and `localhost:3000` for the frontend.

```bash
# Start backend
cd backend
npm install
npm start

# Start frontend (in another terminal)
cd frontend
npm install
npm start
```

### Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify all environment variables are set
3. Test locally first
4. Check MongoDB Atlas connection
5. Review the Vercel documentation

---

**Your app will be available at**: `https://your-project-name.vercel.app`

Replace `your-project-name` with your actual Vercel project name.