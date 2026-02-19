const express = require('express');
const router = express.Router();
const confessionController = require('../controllers/confessionController');
const { ensureAuth } = require('../middleware/auth');

// Home page - all confessions
router.get('/', ensureAuth, confessionController.getAllConfessions);

// New confession page
router.get('/new', ensureAuth, confessionController.getNewConfessionPage);

// Profile page
router.get('/profile', ensureAuth, confessionController.getProfile);

// History page - user's confessions
router.get('/history', ensureAuth, confessionController.getHistory);

// Create confession
router.post('/', ensureAuth, confessionController.createConfession);

// Update confession
router.put('/:id', ensureAuth, confessionController.updateConfession);

// Delete confession
router.delete('/:id', ensureAuth, confessionController.deleteConfession);

// Add reaction
router.post('/:id/react', ensureAuth, confessionController.addReaction);

module.exports = router;
