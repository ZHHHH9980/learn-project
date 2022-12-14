const axios = require("axios");
const launchesDatabase = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;
const SPACEX_URL = "https://api.spacexdata.com/v4/launches/query";

const launch = {
  flightNumber: 100, // flight_number
  mission: "Kepler Exploration X", // rocket.name
  rocket: "Explorer IS1", // rocket
  launchDate: new Date("December 27 2031"), // date_local
  success: true, // success
  upcoming: true, // upcoming
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

async function loadLaunchesData() {
  console.log("loading launches data");
  const response = await axios
    .post(SPACEX_URL, {
      query: {},
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
      options: {
        populate: [
          {
            path: "rocket",
            select: {
              name: 1,
            },
          },
          {
            path: "payloads",
            select: {
              customers: 1,
            },
          },
        ],
      },
    })
    .catch((err) => {
      console.log("err", err);
    });

  console.log("response", response.data);
  /*   for (const launchDoc of launchDocs) {
    const customers = payloads;
    const launch = {};
  } */
}

module.exports = {
  getAllLaunches,
  addNewLaunches,
  loadLaunchesData,
};
