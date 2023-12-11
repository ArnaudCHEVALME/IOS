const { MeetingSpot } = require('../models');

const seedMeetingSpots = async () => {
  try {
    const meeting_spots_count = await MeetingSpot.count();
    if (meeting_spots_count > 0) {
      return;
    }

    const meeting_spots = []

    for (let i = 0; i < 25; i++) {
      const { latitude, longitude } = getRandomCoordinate(36.0, 36.36, -115.31, -115.02673);
      meeting_spots.push(MeetingSpot.create({
        name: `Meeting Spot ${i}`,
        latitude,
        longitude,
      }));
    }

    Promise.all(meeting_spots)
  }
  catch (error) {
    console.log(error.message);
  }
}

function getRandomCoordinate(min_latitude, max_latitude, min_longitude, max_longitude) {
  const latitude = Math.random() * (max_latitude - min_latitude) + min_latitude;
  const longitude = Math.random() * (max_longitude - min_longitude) + min_longitude;
  return { latitude, longitude };
}

seedMeetingSpots();