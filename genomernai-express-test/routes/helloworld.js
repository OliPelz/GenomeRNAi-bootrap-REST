var express = require('express');
var router = express.Router();

/* GET helloworld page. */
router.get('/helloworld', function(req, res) {
  res.send('respond with a resource');
});

module.exports = router;
