const express = require('express');
const router = express.Router();
const controller = require('../controllers/avatar.controller');

module.exports = (app) => {
  // router.get('/', controller.getUserList);
  router.get('/:filename', controller.transferFile);

  app.use('/avatar', router);
}