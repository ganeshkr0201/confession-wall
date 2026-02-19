exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.redirect('/confessions');
    }
    res.redirect('/');
  });
};
