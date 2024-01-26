const express = require('express');
const router = express.Router();
const controller = require('../controllers/meeting_spot.controller');

module.exports = (app) => {
  router.get('/', controller.getMeetingSpotList);
  router.get('/:spot_id', controller.getMeetingSpotById);
  router.post('/add_user', controller.addUserToMeetingSpot);
  router.post('/remove_user', controller.removeUserFromMeetingSpot);

  app.use('/meeting_spot', router);
}