'use strict';

var UserModel = require('../models/UserModel');

// HomeCtrl.js

module.exports = {
  signUp: function (req, res, next) {
    var self = this;

    var data = {
      username: req.body.username || '',
      password: req.body.password || '',
      first_name: req.body.first_name || '',
      age: req.body.age || '',
      login_cookie: UserModel.getCryptedCookie()
    };

    var user = UserModel.build(data);

    user.validate().then(function (errors) {
      if(errors) {
        var errors = [].slice.call(errors.errors).map(function (error) {
          return error.message;
        });

        return res.json({errors: errors}).end();
      }

      user.save().then(function (user) {
        res.cookie('login_cookie', user.login_cookie)
          .json({user: user}).end();
      })
    });

    // UserModel.create(data).then(function (user) {
    //     res.cookie('login_cookie', user.login_cookie)
    //       .json({user: user}).end();
    // }).error(function (errors) {
    //   console.log(errors);
    // });
  },
  signIn: function (req, res, next) {
    var data = {
      username: req.body.username,
      password: req.body.password
    };

    UserModel.find({
      where: {
        username: data.username,
        password: UserModel.getCryptedPassword(data.password)
      }
    }).then(function (user) {
      if(user == null)
        return res.json({
          errors: ['Неправильные данные']
        }).end();

      user.login_cookie = UserModel.getCryptedCookie();

      user.save().then(function (user) {
        res.cookie('login_cookie', user.login_cookie)
          .json({user: user});
      });
      
    }).error(function (errors) {
      console.log(errors);
    });
  },
  signOut: function (req, res, next) {
    var cookie = req.cookies.login_cookie;

    UserModel.find({where: {
      login_cookie: cookie
    }}).then(function (user) { 

      user.login_cookie = null;

      user.save().then(function (user) {
        res.cookie('login_cookie', '', {maxAge: -3600}).end('Go out');
      });
    });
  },
  checkAuth: function (req, res, next) {
    var cookie = req.cookies.login_cookie;

    UserModel.find({
      where: {
        login_cookie: cookie
      },
      attributes: ['id', 'username', 'first_name', 'age']
    }).then(function (user) {
      res.json({user: user}).end();
    });
  },
  beforeAuth: function (req, res, next) {
    var cookie = req.cookies.login_cookie;

    if(!cookie)
      return res.status(401).json({
        errors: ['Необходима авторзация']
      }).end();

    UserModel.find({where: {
      login_cookie: cookie
    }}).then(function (user) {
      if(user == null)
        return res.status(401).json({
        errors: ['Необходима авторзация']
      }).end();

      next();
    });
  },
  beforeNotAuth: function (req, res, next) {
    var cookie = req.cookies.login_cookie;

    if(!cookie) {
      return next();
    }

    UserModel.find({where: {
      login_cookie: cookie
    }}).then(function (user) {
      if(user == null)
        return next();

      res.json({
        errors: ['Вы уже авторизованы']
      }).end();
    });
  }
};