const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;

const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27 2031"),
  success: true,
  upcoming: true,
};

async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error("No matching planet found");
  }

  await launchesDatabase.updateOne(
    // check if launch object is already exist
    {
      flightNumber: launch.flightNumber,
    },
    // if no exist, insert below object
    // if exist , update with below object
    launch,
    {
      upsert: true,
    }
  );
}

// launches.set(launch.flightNumber, launch);
saveLaunch(launch);

// model don't care the specify implementation
async function getAllLaunches() {
  return await launchesDatabase.find({});
}

async function addNewLaunches(_launch) {
  flightNumber++;

  await saveLaunch(
    Object.assign(_launch, {
      flightNumber,
      upcoming: true,
    })
  );
}

async function getLatestFlightNumber() {
  const latestLaunch = await launchesDatabase.findOne().sort("-filghtNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
}

module.exports = {
  getAllLaunches,
  addNewLaunches,
};
