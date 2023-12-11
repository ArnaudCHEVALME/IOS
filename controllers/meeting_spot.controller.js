const { sequelize, MeetingSpot, Presences } = require('../models');

const getMeetingSpotList = async (req, res) => {
  try {
    const meetingSpotList = await MeetingSpot.findAll();
    res.status(200).json(meetingSpotList);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
          model: User,
          as: 'users',
        }
      ]
    });
    res.status(200).json(meetingSpot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getMeetingSpotList,
  getMeetingSpotById,
};