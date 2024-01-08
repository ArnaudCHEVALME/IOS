const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

module.exports = (app) => {
  // router.get('/', controller.getUserList);
  router.get('/:user_id', controller.getUserById);

  app.use('/user', router);
}