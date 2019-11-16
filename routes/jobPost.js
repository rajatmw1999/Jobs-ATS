const mongoose  = require("mongoose"),
      express   = require("express"),
      router    = express.Router(),
      jobPost   = require("../models/jobPost");

//Render JobPost Form
router.get('/postJob', isLoggedIn, function(req, res){
  res.render('postJob');
});

//Save the Posted Job to database and link the author's id and username with the particular post.
router.post('/postJob', isLoggedIn, function(req, res){
  jobPost.create(req.body.jobPost, function(err, jobPost){
    if(err){
      res.redirect('/jobPost');
    }
    jobPost.author.id = req.user._id,
    jobPost.author.username = req.user.username
    jobPost.save();
  });
  res.redirect('/');
});


//middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
