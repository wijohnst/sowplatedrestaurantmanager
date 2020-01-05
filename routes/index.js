var express = require('express');
var router = express.Router();
var moment = require('moment');
const getDb = require("../db").getDb;
module.exports = function(app,db){

app.get('/', function(req, res, next) {
  const heading = 'Restaurant Manager';
  const year = new moment(Date.now()).format('YYYY'); 
  const foot = `${year} - Electric Lunch Lady Land, llc.`;
  res.render('index', {heading, foot});
});

app.get('/test', (req,res,next) => {
  const heading = 'Restaurant Manager';
  const year = new moment(Date.now()).format('YYYY'); 
  const foot = `${year} - Electric Lunch Lady Land, llc.`;
  Promise.resolve(db.collection('sales_reports').findOne()).then(function(report){
    res.send(report);
  })
})
}
// module.exports = router;
 