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
          attributes: ['id', 'firstname', 'lastname', 'bio', 'avatar_path'],
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

module.exports = {
  getMeetingSpotList,
  getMeetingSpotById,
};