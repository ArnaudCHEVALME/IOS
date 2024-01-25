const { Users } = require('../models');

const getUserById = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await Users.findByPk(user_id);
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

const getAll = async (req, res) => {
  try {
    const users = await Users.findAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

const simpleLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({
      where: {
        username: username,
      }
    })
    if (!user) {
      const newUser = await Users.create({
        username: username,
        password: password,
      });
      res.status(200).send(newUser);
    } else if (user.password !== password) {
      res.status(401).send({ error: 'Wrong password' });
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

module.exports = {
  getUserById,
  getAll,
  simpleLogin,
};