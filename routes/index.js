var express = require('express');
var router = express.Router();
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  const heading = 'Restaurant Manager';
  const year = new moment(Date.now()).format('YYYY'); 
  const foot = `${year} - Electric Lunch Lady Land, llc.`
  res.render('index', {heading, foot});
});

module.exports = router;
 