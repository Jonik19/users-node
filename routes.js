'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var UsersCtrl = require('./controllers/UsersCtrl'),
  AuthCtrl = require('./controllers/AuthCtrl');

var init = function (app) {
  app.use(bodyParser.json());
  app.use(cookieParser());
  
  app.post('/sign-up',  AuthCtrl.beforeNotAuth, AuthCtrl.signUp);
  app.post('/sign-in',  AuthCtrl.beforeNotAuth, AuthCtrl.signIn);
  app.post('/sign-out', AuthCtrl.beforeAuth, AuthCtrl.signOut);
  app.post('/check', AuthCtrl.checkAuth);

  app.get('/users', AuthCtrl.beforeAuth, UsersCtrl.index);
  app.get('/users/:id', AuthCtrl.beforeAuth, UsersCtrl.show);
  app.post('/users', AuthCtrl.beforeAuth, UsersCtrl.createOrUpdate);
  app.put('/users/:id', AuthCtrl.beforeAuth, UsersCtrl.createOrUpdate);
  app.delete('/users/:id', AuthCtrl.beforeAuth, UsersCtrl.destroy);
   
  
  app.use('/', express.static('public'));

};

module.exports.init = init;