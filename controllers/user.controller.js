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

module.exports = {
  getUserById,
};