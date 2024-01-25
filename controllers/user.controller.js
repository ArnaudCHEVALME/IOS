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
    const { firstname, lastname } = req.body;
    let user = await Users.findOne({
      where: {
        firstname,
        lastname,
      }
    })
    if (!user) {
      user = await Users.create({
        firstname,
        lastname,
      });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

module.exports = {
  getUserById,
  getAll,
  simpleLogin,
};