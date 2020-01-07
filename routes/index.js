var express = require('express');
// var router = express.Router();
var moment = require('moment');
const getDb = require("../db").getDb;
module.exports = function(app,db){

app.get('/', (req, res, next) => {
  if (req.userContext) {
  // const user = req.userContext.userinfo.name;
  const heading = ` Restaurant Manager`;
  const year = new moment(Date.now()).format('YYYY'); 
  const foot = `${year} - Electric Lunch Lady Land`;
  const buttons = [{buttonText: 'My Profile', link: '/users/profile-menu'}, {buttonText: 'Reports', link: '/reports-menu'}, {buttonText: 'Menu', link: '/menu'}]
  res.render('index', {heading, buttons, foot})
  } else {
    res.send('Please <a href="/login">login</a>');
  }
});

app.get('/menu', (req, res, next) => {
  
  const heading = 'Menu Options';
  const year = new moment(Date.now()).format('YYYY');
  const foot = `${year} - Electric Lunch Lady Land`;
  const buttons = [{buttonText: 'Home', link: '/'}, {buttonText: 'Daily Items', link: '/menu/daily-items'}, {buttonText: 'Recipes', link: '/menu/recipes'} ]
  res.render('menu', {heading, buttons, foot})
})

app.get('/test', (req,res,next) => {
  const heading = ' Test Template';
  const year = new moment(Date.now()).format('YYYY'); 
  const foot = `${year} - Electric Lunch Lady Land`;
  res.render('main-display', {heading, foot})
  })

}



// module.exports = router;
 