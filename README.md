# 🔒 Anonymous Confession Wall

A beautiful, full-stack web application where users can post anonymous confessions using Google OAuth 2.0 authentication. Features multiple pages, modern UI/UX, and comprehensive confession management.

## ✨ Features

- 🔐 **Secure Authentication** - Google OAuth 2.0 integration
- 🏠 **Home Page** - Browse all anonymous confessions
- ➕ **New Confession Page** - Dedicated page for posting confessions
- 📜 **History Page** - View and manage your own confessions
- 👤 **Profile Page** - View your statistics and activity
- 🔑 **Secret Code Protection** - Edit/delete only with your secret code
- ❤️ **Reaction System** - Like, Love, and Laugh reactions
- 🎨 **Modern UI/UX** - Beautiful gradient design with smooth animations
- 📱 **Fully Responsive** - Works perfectly on all devices
- ⚡ **Real-time Updates** - Instant reaction feedback

## 🛠️ Technology Stack

- **Backend:** Node.js & Express.js
- **Database:** MongoDB & Mongoose
- **Frontend:** EJS (Embedded JavaScript Templates)
- **Authentication:** Passport.js (Google OAuth 2.0)
- **Session Management:** express-session

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd anonymous-confession-wall
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/confession-wall
SESSION_SECRET=your-random-session-secret-key-here
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

### 4. Get Google OAuth 2.0 Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure the OAuth consent screen
6. Set **Authorized JavaScript origins:** `http://localhost:3000`
7. Set **Authorized redirect URIs:** `http://localhost:3000/auth/google/callback`
8. Copy the Client ID and Client Secret to your `.env` file

### 5. Start MongoDB

Make sure MongoDB is running on your system:

```bash
# macOS (with Homebrew)
brew services start mongodb-community

# Or run directly
mongod

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

### 6. Run the Application

```bash
# Development mode with auto-restart
npm run dev

# Production mode
npm start
```

Visit `http://localhost:3000` in your browser.

## 📁 Project Structure

```
anonymous-confession-wall/
├── config/
│   ├── database.js          # MongoDB connection
│   └── passport.js          # Google OAuth 2.0 strategy
├── controllers/
│   ├── authController.js    # Authentication logic
│   └── confessionController.js  # All confession operations
├── middleware/
│   └── auth.js              # Authentication middleware
├── models/
│   ├── Confession.js        # Confession schema
│   └── User.js              # User schema
├── public/
│   ├── css/
│   │   └── style.css        # Modern, responsive styling
│   └── js/
│       └── script.js        # Client-side interactions
├── routes/
│   ├── auth.js              # Authentication routes
│   ├── confessions.js       # Confession routes
│   └── index.js             # Landing page route
├── views/
│   ├── partials/
│   │   ├── header.ejs       # Navigation header
│   │   └── footer.ejs       # Footer
│   ├── home.ejs             # All confessions page
│   ├── new-confession.ejs   # Create confession page
│   ├── history.ejs          # User's confessions page
│   ├── profile.ejs          # User profile & stats
│   └── login.ejs            # Login page
├── .env.example
├── .gitignore
├── package.json
├── README.md
├── SETUP_GUIDE.md
└── server.js                # Application entry point
```

## 🔌 API Endpoints

### Authentication Routes
- `GET /` - Login page (guest only)
- `GET /auth/google` - Initiate Google OAuth
- `GET /auth/google/callback` - OAuth callback handler
- `GET /auth/logout` - Logout user

### Confession Routes (Protected)
- `GET /confessions` - Home page with all confessions
- `GET /confessions/new` - New confession page
- `GET /confessions/profile` - User profile page
- `GET /confessions/history` - User's confession history
- `POST /confessions` - Create new confession
- `PUT /confessions/:id` - Update confession (requires secret code)
- `DELETE /confessions/:id` - Delete confession (requires secret code)
- `POST /confessions/:id/react` - Add reaction to confession

## 📊 Database Schema

### User Model
```javascript
{
  googleId: String (required, unique),
  displayName: String,
  email: String,
  createdAt: Date
}
```

### Confession Model
```javascript
{
  text: String (required, max 500 chars),
  secretCode: String (required, min 4 chars),
  reactions: {
    like: Number (default: 0),
    love: Number (default: 0),
    laugh: Number (default: 0)
  },
  userId: String (required),
  createdAt: Date
}
```

## 🎯 Usage Guide

### Getting Started
1. **Login:** Click "Sign in with Google" on the homepage
2. **Navigate:** Use the navigation bar to access different pages

### Pages Overview

#### 🏠 Home Page (`/confessions`)
- View all anonymous confessions from all users
- React to confessions with Like, Love, or Laugh
- See total confession count and your contribution

#### ➕ New Confession Page (`/confessions/new`)
- Dedicated page for creating confessions
- Character counter (max 500 characters)
- Secret code creation (min 4 characters)
- Tips and guidelines for confessing

#### 📜 History Page (`/confessions/history`)
- View all YOUR confessions
- Edit your confessions (with secret code)
- Delete your confessions (with secret code)
- See reaction statistics for each confession

#### 👤 Profile Page (`/confessions/profile`)
- View your user information
- See comprehensive statistics:
  - Total confessions posted
  - Total reactions received (Likes, Loves, Laughs)
  - Average reactions per confession
- Privacy and security information

## 🔒 Security Features

- ✅ Google OAuth 2.0 for secure authentication
- ✅ Secret codes required for edit/delete operations
- ✅ Session-based authentication
- ✅ Protected routes with authentication middleware
- ✅ Input validation and sanitization
- ✅ Password-type input for secret codes

## 🎨 UI Features

- **Modern Gradient Design** - Beautiful purple gradient theme
- **Smooth Animations** - Fade-in, slide, and pulse effects
- **Icon Integration** - Font Awesome icons throughout
- **Card-based Layout** - Clean, organized content presentation
- **Responsive Navigation** - Adaptive menu for all screen sizes
- **Interactive Feedback** - Visual responses to user actions
- **Modal Dialogs** - Elegant edit/delete confirmations
- **Empty States** - Helpful messages when no content exists
- **Loading States** - Visual feedback during operations
- **Custom Scrollbar** - Styled scrollbar matching theme

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Make sure MongoDB is running
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux
```

### Google OAuth Error
- Verify your Client ID and Client Secret in `.env`
- Check authorized redirect URIs in Google Cloud Console
- Ensure the callback URL matches exactly

### Port Already in Use
```bash
# Change PORT in .env file or kill the process
lsof -ti:3000 | xargs kill  # macOS/Linux
```

## 📝 License

ISC

## 👨‍💻 Author

Your Name

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

Give a ⭐️ if you like this project!
