var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET helloworld page. */
router.get('/helloworld', function(req, res) {
  res.send('respond with a resource');
});
/* GET Userlist page. */
router.get('/userlist', function(req, res) { 
  var db = req.db;
  var collection = db.get('usercollection'); 
  collection.find({},{},function(e,docs){
     res.render('userlist', {
                "userlist" : docs
               }); 
    });
});
/* GET New User page. */
router.get('/newuser', function(req, res) {
   res.render('newuser', { 
      title: 'Add New User'
   });
});
/* POST to Add User Service */
router.post('/adduser', function(req, res) { // Set our internal DB variable
    var db = req.db;
    // Get our form values. These rely on the "
    var userName = req.body.userName; 
    var userEmail = req.body.userMail;
    // Set our collection
    var collection = db.get('usercollection');
    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
         }, function (err, doc) { if (err) {
            // If it failed, return error
               res.send("There was a problem adding the user to the database");
         }
         else {
     // If it worked, set the header so res.location("userlist");
     // And forward to success page res.redirect("userlist");
         } 
    });
});

module.exports = router;
