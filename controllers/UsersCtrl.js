'use strict';

var UserModel = require('../models/UserModel');
var config = require('../config');

// HomeCtrl.js

module.exports = {
  index: function (req, res, next) {
    var page = req.query.page || 1;
    var limit = (page-1)*config.view.users.perPage;

    UserModel.findAll({
      attributes: ['id', 'username', 'first_name', 'age']
    }).then(function (users) {
      res.json({users: users}).end();
    });
    
  },
  show: function (req, res, next) {
    var id = req.params.id;

    UserModel.find({
      where: {id: id},
      attributes: ['id', 'username', 'first_name', 'age']
    }).then(function (user) {
      res.json({user: user}).end();
    });
    
  },
  createOrUpdate: function (req, res, next) {
    var id = req.params.id;

    var data = {
      username: req.body.username,
      password: req.body.password || null,
      age: req.body.age,
      first_name: req.body.first_name
    };

    UserModel.find({
      where: {id: id},
      attributes: ['id', 'username', 'first_name', 'age']
    }).then(function (user) {

      if(user !== null) {
        for(var key in data) {
          if(data[key] !== null) {
            user[key] = data[key];
          }
        };

        user.save().then(function (user) {
          res.json({user: user}).end();
        })
      } else {
        UserModel.build(data).save().then(function (user) {
          res.json({user: user}).end();
        });
      }

      
    });
    
  },
  destroy: function (req, res, next) {
    var id = req.params.id;

    UserModel.find({
      where: {id: id}
    }).then(function (user) {
      user.destroy().then(function () {
        res.end('User destroyed');
      });
    });
    
  }
};