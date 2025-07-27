# Deployment Guide: GitHub Export & Render Hosting

## Step 1: Export to GitHub

### Option A: Using Git Commands (Recommended)
1. **Initialize Git repository** (if not already done):
   ```bash
   git init
   ```

2. **Add all files**:
   ```bash
   git add .
   ```

3. **Create initial commit**:
   ```bash
   git commit -m "Initial commit: PC Builder website"
   ```

4. **Create a new repository on GitHub**:
   - Go to [GitHub.com](https://github.com)
   - Click "New repository"
   - Name it `pc-builder-website`
   - Don't initialize with README (since you already have files)

5. **Connect local repository to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/pc-builder-website.git
   git branch -M main
   git push -u origin main
   ```

### Option B: GitHub Desktop
1. Download and install GitHub Desktop
2. File → Add Local Repository → Select your project folder
3. Create repository on GitHub.com
4. Publish repository from GitHub Desktop

## Step 2: Deploy on Render

### Prerequisites
- GitHub account with your repository
- Render account (free at [render.com](https://render.com))

### Deployment Steps

1. **Sign up/Login to Render**:
   - Go to [render.com](https://render.com)
   - Sign up with your GitHub account

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select `pc-builder-website` repository

3. **Configure Build Settings**:
   ```
   Name: pc-builder-website
   Environment: Node
   Region: Choose closest to your users
   Branch: main
   Root Directory: (leave empty)
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

4. **Environment Variables** (if needed):
   - Add any environment variables your app needs
   - For this basic app, none are required

5. **Deploy**:
   - Click "Create Web Service"
   - Render will automatically build and deploy your app
   - Your app will be available at: `https://your-app-name.onrender.com`

### Auto-Deploy Setup
- Render automatically redeploys when you push to the main branch
- Any changes you push to GitHub will trigger a new deployment

## Step 3: Custom Domain (Optional)

1. **Purchase a domain** from providers like:
   - Namecheap
   - GoDaddy
   - Cloudflare

2. **Configure DNS in Render**:
   - Go to your service settings
   - Add custom domain
   - Follow Render's DNS configuration instructions

## Important Notes

- **Build Time**: First deployment may take 5-10 minutes
- **Free Tier Limitations**: 
  - Apps sleep after 15 minutes of inactivity
  - 750 hours/month of usage
  - Slower cold starts
- **Upgrade**: Consider paid plans for production apps

## Troubleshooting

### Common Issues:
1. **Build fails**: Check that `package.json` has correct scripts
2. **App won't start**: Ensure `npm start` works locally
3. **Environment issues**: Check Node.js version compatibility

### Build Commands for Different Setups:
- **Next.js**: `npm install && npm run build`
- **React**: `npm install && npm run build`
- **Custom**: Adjust based on your build process

Your PC Builder website should now be live and accessible to anyone on the internet!
