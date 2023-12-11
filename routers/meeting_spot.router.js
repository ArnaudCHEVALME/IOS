const express = require('express');
const router = express.Router();
const meetingSpotController = require('../controllers/meeting_spot.controller');

module.exports = (app) => {
  router.get('/', meetingSpotController.getMeetingSpotList);
  router.get('/:spot_id', meetingSpotController.getMeetingSpot);

  app.use('/meeting_spot', router);
}