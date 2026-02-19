const express = require('express');
const router = express.Router();
const { ensureGuest } = require('../middleware/auth');

router.get('/', ensureGuest, (req, res) => {
  res.render('login');
});

module.exports = router;
