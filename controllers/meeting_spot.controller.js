const { MeetingSpot, Users } = require('../models');

const getMeetingSpotList = async (req, res) => {
  try {
    const meetingSpotList = await MeetingSpot.findAll();
    res.status(200).send(meetingSpotList);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

const getMeetingSpotById = async (req, res) => {
  try {
    const { spot_id } = req.params;
    const meetingSpot = await MeetingSpot.findOne({
      where: {
        id: spot_id
      },
      include: [
        {
          model: Users,
          as: 'users',
          attributes: ['id', 'username', 'firstname', 'lastname', 'bio', 'avatar_path'],
          through: {
            attributes: []
          }
        }
      ]
    });
    res.status(200).send(meetingSpot);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

const addUserToMeetingSpot = async (req, res) => {
  try {
    const { spot_id, user_id } = req.body;
    const meetingSpot = await MeetingSpot.findOne({
      where: {
        id: spot_id
      }
    });
    const user = await Users.findOne({
      where: {
        id: user_id
      }
    });
    if (!meetingSpot || !user) {
      return res.status(404).send({ error: 'User or meeting spot not found' });
    }

    // find meetingSpots where the user is present
    const occupiedMeetingSpot = await MeetingSpot.findAll({
      include: [
        {
          model: Users,
          as: 'users',
          where: {
            id: user_id
          }
        }
      ]
    });

    if (occupiedMeetingSpot.length > 0) {
      occupiedMeetingSpot.forEach(async (spot) => {
        await spot.removeUser(user);
      });
    }

    if (meetingSpot.users.includes(user)) {
      res.status(400).send({ error: 'User already in meeting spot' });
    } else {
      await meetingSpot.addUser(user);
      res.status(200).send({ message: 'User added to meeting spot' });
    }
    await meetingSpot.addUser(user);
    res.status(200).send({ message: 'User added to meeting spot' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

const removeUserFromMeetingSpot = async (req, res) => {
  try {
    const { spot_id, user_id } = req.body;
    const meetingSpot = await MeetingSpot.findOne({
      where: {
        id: spot_id
      }
    });
    const user = await Users.findOne({
      where: {
        id: user_id
      }
    });
    if (!meetingSpot || !user) {
      res.status(404).send({ error: 'User or meeting spot not found' });
    } else if (!meetingSpot.users.includes(user)) {
      res.status(400).send({ error: 'User not in meeting spot' });
    } else {
      await meetingSpot.removeUser(user);
      res.status(200).send({ message: 'User removed from meeting spot' });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

module.exports = {
  getMeetingSpotList,
  getMeetingSpotById,
  addUserToMeetingSpot,
  removeUserFromMeetingSpot,
};