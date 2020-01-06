var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var assert = require('assert');
var app = express();

//MongoDB
var MongoClient = require('mongodb').MongoClient;
const dbName = require('./config/dbConfig').dbName;
const url = require('./config/dbConfig').url;

//Okta Auth
const session = require('express-session');
const { ExpressOIDC } = require('@okta/oidc-middleware');
const okta = require('./config/okta');


app.engine('pug', require('pug').__express)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Okta Middleware
const oidc = new ExpressOIDC({
  issuer: `https://${okta.oktaDomain}/oauth2/default`,
  client_id: okta.client,
  client_secret: okta.okta,
  appBaseUrl: 'http://sowplatedrestaurantmanager-env-1.m2pjgcrr88.us-east-2.elasticbeanstalk.com',
  scope: 'openid profile'
});

app.use(session({
  secret: 'purple monkey buttwasher',
  resave: true,
  saveUninitialized: false
}));

app.use(oidc.router); 

MongoClient.connect(url, function(err, client){
  assert.equal(null,err);
  console.log('Connected successfully to MongoDb...');

  const database = client.db(dbName);
  if (err) return console.log(`Mongo DB Client Error: ${err}`)

  require('./routes/index')(app, database)
}); 

  oidc.on('ready', () =>{
  var port = process.env.PORT || '3000';
  app.listen(port, () =>{
    console.log(`Live on ${port}...`)
  })
  })

  oidc.on('error', err =>{
    console.log('Unable to configure ExpressOIDC', err);
  })

module.exports = app;
