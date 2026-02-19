const Confession = require('../models/Confession');

exports.getAllConfessions = async (req, res) => {
  try {
    const confessions = await Confession.find().sort({ createdAt: -1 });
    const totalConfessions = await Confession.countDocuments();
    const userConfessions = await Confession.countDocuments({ userId: req.user.googleId });
    
    // Add user reaction info to each confession
    const confessionsWithUserReactions = confessions.map(confession => {
      const userReaction = confession.reactedUsers.find(
        r => r.userId === req.user.googleId
      );
      return {
        ...confession.toObject(),
        userReaction: userReaction ? userReaction.reactionType : null
      };
    });
    
    res.render('home', { 
      user: req.user, 
      confessions: confessionsWithUserReactions,
      totalConfessions,
      userConfessions,
      error: req.query.error,
      success: req.query.success,
      page: 'home'
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getNewConfessionPage = (req, res) => {
  res.render('new-confession', {
    user: req.user,
    error: req.query.error,
    success: req.query.success,
    page: 'new'
  });
};

exports.getProfile = async (req, res) => {
  try {
    const userConfessions = await Confession.countDocuments({ userId: req.user.googleId });
    const totalReactions = await Confession.aggregate([
      { $match: { userId: req.user.googleId } },
      {
        $group: {
          _id: null,
          totalLikes: { $sum: '$reactions.like' },
          totalLoves: { $sum: '$reactions.love' },
          totalLaughs: { $sum: '$reactions.laugh' }
        }
      }
    ]);
    
    const stats = totalReactions[0] || { totalLikes: 0, totalLoves: 0, totalLaughs: 0 };
    
    res.render('profile', {
      user: req.user,
      userConfessions,
      stats,
      page: 'profile'
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.getHistory = async (req, res) => {
  try {
    const confessions = await Confession.find({ userId: req.user.googleId }).sort({ createdAt: -1 });
    
    res.render('history', {
      user: req.user,
      confessions,
      error: req.query.error,
      success: req.query.success,
      page: 'history'
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

exports.createConfession = async (req, res) => {
  try {
    const { text, secretCode } = req.body;
    
    if (!text || !secretCode) {
      return res.redirect('/confessions/new?error=All fields are required');
    }
    
    if (secretCode.length < 4) {
      return res.redirect('/confessions/new?error=Secret code must be at least 4 characters');
    }
    
    await Confession.create({
      text,
      secretCode,
      userId: req.user.googleId
    });
    
    res.redirect('/confessions?success=Confession posted successfully');
  } catch (err) {
    console.error(err);
    res.redirect('/confessions/new?error=Failed to post confession');
  }
};

exports.updateConfession = async (req, res) => {
  try {
    const { text, secretCode } = req.body;
    const confession = await Confession.findById(req.params.id);
    
    if (!confession) {
      return res.redirect('/confessions?error=Confession not found');
    }
    
    if (confession.secretCode !== secretCode) {
      return res.redirect('/confessions?error=Invalid secret code');
    }
    
    confession.text = text;
    await confession.save();
    
    res.redirect('/confessions?success=Confession updated successfully');
  } catch (err) {
    console.error(err);
    res.redirect('/confessions?error=Failed to update confession');
  }
};

exports.deleteConfession = async (req, res) => {
  try {
    const { secretCode } = req.body;
    const confession = await Confession.findById(req.params.id);
    
    if (!confession) {
      return res.redirect('/confessions/history?error=Confession not found');
    }
    
    if (confession.userId !== req.user.googleId) {
      return res.redirect('/confessions/history?error=Unauthorized');
    }
    
    if (confession.secretCode !== secretCode) {
      return res.redirect('/confessions/history?error=Invalid secret code');
    }
    
    await Confession.findByIdAndDelete(req.params.id);
    res.redirect('/confessions/history?success=Confession deleted successfully');
  } catch (err) {
    console.error(err);
    res.redirect('/confessions/history?error=Failed to delete confession');
  }
};

exports.addReaction = async (req, res) => {
  try {
    const { reactionType } = req.body;
    const confession = await Confession.findById(req.params.id);
    
    if (!confession) {
      return res.status(404).json({ error: 'Confession not found' });
    }
    
    if (!['like', 'love', 'laugh'].includes(reactionType)) {
      return res.status(400).json({ error: 'Invalid reaction type' });
    }
    
    // Check if user already reacted
    const existingReaction = confession.reactedUsers.find(
      r => r.userId === req.user.googleId
    );
    
    if (existingReaction) {
      // User already reacted, update their reaction
      if (existingReaction.reactionType === reactionType) {
        // Same reaction - remove it (toggle off)
        confession.reactions[reactionType]--;
        confession.reactedUsers = confession.reactedUsers.filter(
          r => r.userId !== req.user.googleId
        );
      } else {
        // Different reaction - change it
        confession.reactions[existingReaction.reactionType]--;
        confession.reactions[reactionType]++;
        existingReaction.reactionType = reactionType;
      }
    } else {
      // New reaction
      confession.reactions[reactionType]++;
      confession.reactedUsers.push({
        userId: req.user.googleId,
        reactionType: reactionType
      });
    }
    
    await confession.save();
    
    // Get user's current reaction
    const userReaction = confession.reactedUsers.find(
      r => r.userId === req.user.googleId
    );
    
    res.json({ 
      success: true, 
      reactions: confession.reactions,
      userReaction: userReaction ? userReaction.reactionType : null
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
