# 🚀 Quick Setup Guide

Follow these steps to get your Anonymous Confession Wall up and running!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Setup MongoDB

### Option A: Local MongoDB
```bash
# macOS
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Ubuntu/Debian
sudo apt-get install mongodb
sudo systemctl start mongodb

# Windows
# Download from https://www.mongodb.com/try/download/community
# Install and start MongoDB service
```

### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Use it in your `.env` file

## Step 3: Get Google OAuth Credentials

1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (e.g., "Confession Wall")
3. Enable APIs:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" and enable it
4. Create OAuth Credentials:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client ID"
   - Configure consent screen (External, add app name)
   - Application type: "Web application"
   - Add authorized JavaScript origins: `http://localhost:3000`
   - Add authorized redirect URIs: `http://localhost:3000/auth/google/callback`
   - Click "Create"
5. Copy your Client ID and Client Secret

## Step 4: Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/confession-wall
SESSION_SECRET=my-super-secret-session-key-12345
GOOGLE_CLIENT_ID=your-client-id-here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret-here
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

**Important:** 
- Replace `GOOGLE_CLIENT_ID` with your actual Client ID
- Replace `GOOGLE_CLIENT_SECRET` with your actual Client Secret
- Change `SESSION_SECRET` to a random string

## Step 5: Start the Application

```bash
# Development mode (with auto-restart)
npm run dev

# OR Production mode
npm start
```

## Step 6: Test the Application

1. Open your browser and go to `http://localhost:3000`
2. Click "Sign in with Google"
3. Authorize the application
4. Start posting confessions!

## 🎉 You're Done!

Your Anonymous Confession Wall is now running!

## 📝 Testing Checklist

- [ ] Can login with Google
- [ ] Can post a confession with secret code
- [ ] Can see all confessions
- [ ] Can react to confessions (👍 ❤️ 😂)
- [ ] Can edit confession with correct secret code
- [ ] Cannot edit with wrong secret code
- [ ] Can delete confession with correct secret code
- [ ] Cannot delete with wrong secret code
- [ ] Can logout successfully

## 🐛 Common Issues

### Issue: "Cannot connect to MongoDB"
**Solution:** Make sure MongoDB is running
```bash
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux
```

### Issue: "Google OAuth Error"
**Solution:** 
- Check your Client ID and Secret in `.env`
- Verify redirect URI in Google Console matches exactly
- Make sure Google+ API is enabled

### Issue: "Port 3000 already in use"
**Solution:** 
- Change PORT in `.env` to another port (e.g., 3001)
- Or kill the process using port 3000:
```bash
lsof -ti:3000 | xargs kill  # macOS/Linux
```

### Issue: "Session secret error"
**Solution:** Make sure SESSION_SECRET is set in your `.env` file

## 🔐 Security Notes

- Never commit your `.env` file to Git
- Use strong, random SESSION_SECRET in production
- For production, use HTTPS and update callback URLs
- Consider using MongoDB Atlas for production database

## 📚 Next Steps

- Deploy to Heroku, Vercel, or Railway
- Add more features (comments, user profiles, etc.)
- Customize the design
- Add email notifications
- Implement confession moderation

## 💡 Tips

- Secret codes are case-sensitive
- Minimum secret code length is 4 characters
- Confessions are displayed newest first
- Each user can post unlimited confessions
- Reactions are anonymous and unlimited

## 🆘 Need Help?

If you encounter any issues:
1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Make sure MongoDB is running
4. Check Google OAuth credentials
5. Review the README.md for detailed documentation

Happy Confessing! 🎉
