//jshint esversion:6

var express         = require("express"),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    lodash          = require("lodash"),
    flash           = require("connect-flash"),
    passport        = require("passport");
    methodOverride  = require("method-override"),
    multer          = require("multer"),
    LocalStrategy   = require("passport-local");

//requiring mongoose models
var User = require("./models/user");

//requiring all routes
var userRoute = require("./routes/userRoutes/user"),
    jobPost   = require("./routes/jobPost"),
    uploadCV  = require("./routes/uploadCV");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
//mongoose.connect('mongodb://localhost:27017/jobportal');
mongoose.connect("mongodb+srv://rajat-admin:rajat1999@cluster0-nbxxl.mongodb.net/jobportal",{useNewUrlParser: true});

app.use(methodOverride("_method"));
app.use(flash());


//===========================
//Passport configuration
//==============================
app.use(require("express-session")({
  secret: "This is yatraClub",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  // res.locals.error = req.flash("error");
  // res.locals.success = req.flash("success");
  next();
});
//==================================================
//END OF PASSPORT CONFIGURATION
//==================================================



app.use(userRoute);
app.use(jobPost);
app.use(uploadCV);

//================================================
//UPlOADING FILES WITH MULTER
//================================================

app.listen(process.env.PORT || 3000,function(){
  console.log('Server is running successfully on port 3000!');
});
