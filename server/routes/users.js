const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../../config/database');
const User = require('../../models/user');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
});

//GetUser
router.get('/:id', (req, res, next) => {
  console.log(req.params.id);
  User.getUserById(req.params.id, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to find user'});
    } else {
      res.send(user);
    }
  });
});

// Update Owned Exchanges
router.post('/updateOwned', (req, res, next) => {
  const username = req.body.username;
  const exchange = req.body.ownedExchanges;
  User.updateOwnedExchanges(username, exchange, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to update user'});
    } else {
      res.json({success: true, msg:'User updated'});
    }
  });
});


// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign({ data:user }, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+ token,
          user: {
            id: user._id,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

module.exports = router;
