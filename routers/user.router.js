const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');

module.exports = (app) => {
  router.get('/', controller.getAll);
  router.get('/:user_id', controller.getUserById);
  router.post('/login', controller.simpleLogin);
  router.put('/update', controller.updateProfile);

  app.use('/user', router);
}