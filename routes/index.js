var express = require('express');
// var router = express.Router();
var moment = require('moment');
const axios = require('axios').default;
const body = require('body-parser');
const cleanFish = require('../utils/cleanFish');

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
  const buttons = [{buttonText: 'Home', link: '/'}, {buttonText: 'Daily Items', link: '/menu/daily-items'}, {buttonText: `Chef's Special`, link:'/menu/special'}, {buttonText: 'Recipes', link: '/menu/recipes'} ]
  res.render('menu', {heading, buttons, foot})
})

app.get('/menu/daily-items', (req, res, next) => {
  
  const heading = 'Daily Menu Items';
  const year = new moment(Date.now()).format('YYYY');
  const foot = `${year} - Electric Lunch Lady Land`;
  const buttons = [{buttonText: 'Home', link: '/'}, {buttonText: 'Back', link: '/menu'}, {buttonText: 'Update', link: '/menu/daily-items/update'}]
  
  const soup = db.collection('soup').findOne({active : { $eq : true} });
  const quiche = db.collection('quiche').findOne({active : { $eq : true} });
  const fish = db.collection('fish').findOne({active : { $eq : true} });
  
  Promise.all([soup,quiche,fish]).then(function(dailyItems){
    const soup = dailyItems[0];
    const quiche = dailyItems[1];
    const fish = dailyItems[2];
    const fishQuery = fish.name.toLowerCase();
    
    axios.get(`https://www.fishwatch.gov/api/species/${fishQuery}`)
      .then(function(response){
      const fishData = response.data[0];
      const fishFacts = cleanFish(fishData);
      console.log(fishFacts)
      res.render('daily-items', {heading, buttons, foot, soup, quiche, fish, fishFacts})
      })
      .catch(error => console.log(error))
    // res.render('daily-items', {heading, buttons, foot, soup, quiche, fish})
  });

  
  
})

app.get('/test', (req,res,next) => {
  const heading = ' Test Template';
  const year = new moment(Date.now()).format('YYYY'); 
  const foot = `${year} - Electric Lunch Lady Land`;
  res.render('main-display', {heading, foot})
  })

}



// module.exports = router;
 