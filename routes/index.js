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
  const buttons = [{buttonText: 'Menu', link: '/menu'}]
  res.render('index', {heading, buttons, foot})
  } else {
    // res.render('login')
    res.send('<html><head><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet", medila="all", href="/stylesheets/style.css" type="text/css"><h1><div class="card heading color" id="head-container"><div id="logo-wrapper><span id="sow">SŌW<span id="plated"> Plated - Resturant Manager</h1></div><h3><a href="/login"> Please Login</a></h3></div>');
  }
});

app.get('/home', (req, res, next) => {
  const heading = ` Restaurant Manager`;
  const year = new moment(Date.now()).format('YYYY'); 
  const foot = `${year} - Electric Lunch Lady Land`;
  const buttons = [{buttonText: 'Menu', link: '/menu'}]
  res.render('index', {heading, buttons, foot})
  }); 

app.get('/menu', (req, res, next) => {
  
  const heading = 'Menu Options';
  const year = new moment(Date.now()).format('YYYY');
  const foot = `${year} - Electric Lunch Lady Land`;
  const buttons = [{buttonText: 'Home', link: '/home'}, {buttonText: 'Daily Items', link: '/menu/daily-items'}]
  res.render('menu', {heading, buttons, foot})
})

app.get('/menu/daily-items', (req, res, next) => {
  
  const heading = 'Daily Menu Items';
  const year = new moment(Date.now()).format('YYYY');
  const foot = `${year} - Electric Lunch Lady Land`;
  const buttons = [{buttonText: 'Home', link: '/home'}, {buttonText: 'Back', link: '/menu'}, {buttonText: 'Update', link: '/menu/daily-items/update'}]
  
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
      res.render('daily-items', {heading, buttons, foot, soup, quiche, fish, fishFacts})
      })
      .catch(error => console.log(error))
  });
})

app.get('/menu/daily-items/update', (req, res, next) =>{
  const heading = 'Update Daily Items';
  const year = new moment(Date.now()).format('YYYY');
  const foot = `${year} - Electric Lunch Lady Land`;
  
  res.render('updateQuicheSoup', {heading, foot})
})

app.post('/updateDailyItems', (req,res,next) => {
  const collection = req.body.item;
  const query = db.collection(collection).findOne({active : { $eq : true}})
  const entries = db.collection(collection).find({active : { $eq : false}}).toArray();
  Promise.all([query, entries]).then(function(result){

    const query = result[0];
    const entries = result[1];

    switch(collection){
      case 'soup':
        var heading = 'Update Soup';
        const activeSoup = query.name;
        const inactiveSoups = entries;
        res.render('update-soup', {heading, activeSoup, inactiveSoups})
        break;
      case 'quiche':
        heading = 'Update Quiche'
        res.render('update-quiche', {heading})
        break;
      case 'fish':
        heading = 'Update Fish'
        res.render('update-fish', {heading})
        break;
    }
  })
})

app.post('/updateDailyItems/soup', (req,res,next) => {
  const soupName = req.body.soup;
  console.log(soupName);
  if(soupName === 'new'){
    res.render('createNewSoup')
  }
  else{
    const oldActiveSoup = db.collection('soup').findOneAndUpdate({active : {$eq : true}}, {$set: {active : false}});
    const newActiveSoup = db.collection('soup').findOneAndUpdate({name : soupName}, {$set: {active : true}});

    Promise.all([oldActiveSoup, newActiveSoup]).then(function(){
      res.redirect('/menu/daily-items');
  })
}
})
}

// module.exports = router;
 