var express = require('express');
var router = express.Router();
var moment = require('moment');
const getDb = require("../db").getDb;
module.exports = function(app,db){

app.get('/', (req, res) => {
  if (req.userContext) {
  const user = req.userContext.userinfo.name;
  const heading = 'Restaurant Manager';
  const year = new moment(Date.now()).format('YYYY'); 
  const foot = `${year} - Electric Lunch Lady Land, llc.`;
  res.render('index', {heading, user, foot})
  } else {
    res.send('Please <a href="/login">login</a>');
  }
});

app.get('/test', (req,res,next) => {
  const heading = 'Test Template';
  const year = new moment(Date.now()).format('YYYY'); 
  const foot = `${year} - Electric Lunch Lady Land, llc.`;
  res.render('page-template', {heading, foot})
  })

}



// module.exports = router;
 