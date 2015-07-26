'use strict;'

var config = require('../config');
var q = require('q');
var Sequelize = require('sequelize');
var db = require('../db');
var crypto = require('crypto');

var User = db.define('User', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Ник не может быть пустым'
      },
      isUnique: function(value, next) {

        User.find({
            where: {username: value},
            attributes: ['id']
        })
        .then(function(user) {
          if (user)
              // We found a user with this username address.
              // Pass the error to the next method.
              return next('Такой ник уже используется');

          // If we got this far, the username address hasn't been used yet.
          // Call next with no arguments when validation is successful.
          next();
        }).error(function (error) {
          return next(error);
        });
      }
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 6
    }
   },
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'Имя не может быть пустым'
      }
    }
  },
  age: {type: Sequelize.INTEGER},
  login_cookie: {type: Sequelize.STRING},
}, {
  setterMethods: {
    password: function (password) {
      var pass = User.getCryptedPassword(password);
      this.setDataValue('password', pass);
    },
    login_cookie: function (cookie) {
      this.setDataValue('login_cookie', cookie);
    }
  }
});

User.getCryptedPassword = function (password) {
  var salt = config.auth.salt;
  var hash = crypto.createHmac('sha1', salt).update(password || '');
  var pass = hash.digest('hex');

  return pass;
};

User.getCryptedCookie = function () {
  var salt = config.auth.salt;
  var hash = crypto.createHmac('sha1', salt).update(Date.now().toString());
  var cookie = hash.digest('hex');

  return cookie;
};


module.exports = User;

User.sync({force: config.db.forcing});