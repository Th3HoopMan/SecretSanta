const express = require('express');
const router = express.Router();
const Exchange = require('../../models/exchange');

// Create
router.post('/create', (req, res, next) => {
  let newExchange = new Exchange({
    name: req.body.name,
    startDate: req.body.startDate,
    matchDate: req.body.matchDate,
    endDate: req.body.endDate,
    privacy: req.body.privacy,
    owner: req.body.owner,
    description: req.body.description,
    maxParticipants: req.body.maxParticipants,
    usersParticipating: req.body.usersParticipating
  });

  Exchange.addExchange(newExchange, (err, exchange) => {
    if(err){
      res.json({success: false, msg:'Failed to create exchange'});
    } else {
      res.json({success: true, msg:'Exchange created'});
    }
  });
});

router.get('/viewAll', (req, res, next) => {
  Exchange.getAllExchanges((err, exchange) => {
    if(err){
      res.json({success: false, msg:'Failed to create exchange'});
    } else {
      res.send(exchange);
    }
  });
});

module.exports = router;
