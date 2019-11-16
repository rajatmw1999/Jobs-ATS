const express   = require("express"),
      router    = express.Router(),
      multer    = require("multer");

//Render the uploading file page
router.get('/uploadCV', isLoggedIn, function(req, res){
  res.render("uploadCV");
});

//Specify the destination folder and the saved file's name format
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./CVData");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});

//declare the upload object
var upload = multer({ storage: Storage }).array("imgUploader", 10); //Field name and max count

//handling post of CV and saving it in the folder.
router.post("/api/Upload", isLoggedIn, function (req, res) {
    upload(req, res, function (err) {
        if (err) {
          console.log(err);
            return res.end("Something went wrong!");
        }
        return res.end("File uploaded sucessfully!.");
    });
});


//middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
