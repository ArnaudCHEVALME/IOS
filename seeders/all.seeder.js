const { MeetingSpot, Users } = require('../models');

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

const seedUsers = async () => {
  try {
    const user_count = await Users.count();
    if (user_count > 0) {
      return;
    }

    const users = []
    const avatar_paths = [
      'default.png',
      'green.png'
    ]

    const avatar_path = avatar_paths[Math.floor(Math.random() * avatar_paths.length)];

    for (let i = 0; i < 100; i++) {
      users.push(Users.create({
        firstname: `firstname ${i}`,
        lastname: `lastname ${i}`,
        bio: `bio ${i}`,
        avatar_path,
      }));
    }

    Promise.all(users)
  }
  catch (error) {
    console.log(error.message);
  }
}


const seedAll = async () => {
  await Promise.all([seedMeetingSpots(), seedUsers()]);

  const meeting_spots = await MeetingSpot.findAll();
  const users = await Users.findAll();

  for (const user of users) {
    // choose a random meeting spot
    const meeting_spot = meeting_spots[Math.floor(Math.random() * meeting_spots.length)];
    await meeting_spot.addUser(user);
  }
}

seedAll();