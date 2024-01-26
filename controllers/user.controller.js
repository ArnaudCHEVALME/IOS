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
        firstname: firstname,
        lastname: lastname,
        bio: '',
        avatar_path: '',
      });
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

const updateProfile = async (req, res) => {
  try {
    const { userId, firstName, lastName, bio } = req.body;

    let user = await Users.findByPk(userId);

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    user.firstname = firstName;
    user.lastname = lastName;
    user.bio = bio;

    await user.save();

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}



module.exports = {
  getUserById,
  getAll,
  simpleLogin,
  updateProfile,
};