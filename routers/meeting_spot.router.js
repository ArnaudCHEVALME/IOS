const express = require('express');
const router = express.Router();
const controller = require('../controllers/meeting_spot.controller');

module.exports = (app) => {
  router.get('/', controller.getMeetingSpotList);
  router.get('/:spot_id', controller.getMeetingSpotById);

  app.use('/meeting_spot', router);
}