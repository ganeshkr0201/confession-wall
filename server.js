require('dotenv').config();
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const path = require('path');
const connectDB = require('./config/database');
const passport = require('./config/passport');
const indexRoute = require('./routes/index');
const authRoute = require('./routes/auth');
const confessionRoute = require('./routes/confessions');

const app = express();

// Connect to database
connectDB();

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files - MUST be before other middleware
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', indexRoute);
app.use('/auth', authRoute);
app.use('/confessions', confessionRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
