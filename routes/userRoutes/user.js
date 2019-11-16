const mongoose = require("mongoose"),
      express  = require("express"),
      passport = require("passport"),
      User     = require("../../models/user");

const router = express.Router();

//root route
router.get('/', function(req, res){
  res.render('home');
});


//===================================================================
//Main SIGNUP Page
router.get('/register', loginPageDisplay, function(req,res){
  res.render('SignUpForms/main-register');
});

//User SIGNUP Page
router.get('/register/user', loginPageDisplay, function(req, res){
  res.render('SignUpForms/user-register');
});

//Company SIGNUP Page
router.get('/register/business', loginPageDisplay, function(req, res){
  res.render('SignUpForms/business-register');
});

//SIGNUP Logic
router.post('/register/:typeOfSignup', function(req, res){
  var newUser = new User({
    type: req.params.typeOfSignup,
    username: req.body.username
  });
  User.register(newUser, req.body.password, function(err, user){
    if(err){
      console.log(err);
      var render = req.params.typeOfSignup + '-register';
      return res.render(render);
    }
      passport.authenticate("local")(req, res, function(){
        res.redirect('/');
      });
  });
});
//==========================================================================================

//Main LOGIN page
router.get('/login', loginPageDisplay,function(req, res){
  res.render('LoginForms/main-login');
});

//Company LOGIN page
router.get('/login/business', loginPageDisplay, function(req, res){
  res.render('LoginForms/business-login');
});

//User LOGIN page
router.get('/login/user', loginPageDisplay, function(req, res){
  res.render('LoginForms/user-login');
});

//Handling LOGIN logic
router.post('/login/:typeOfLogin', passport.authenticate("local", {
  successRedirect:'/',
  failureRedirect:'/login'
}),function(req,res){});

//logout
router.get('/logout', function(req,res){
  req.logout();
  res.redirect('/');
});

//middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function loginPageDisplay(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}


module.exports = router;
