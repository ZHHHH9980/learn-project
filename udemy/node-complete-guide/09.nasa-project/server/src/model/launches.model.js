const launches = require("./launches.mongo");
// const launches = new Map();

let flightNumber = 100;
const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27 2031"),
  success: true,
  upcoming: true,
};

launches.set(launch.flightNumber, launch);

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunches(_launch) {
  flightNumber++;
  launches.set(
    flightNumber,
    Object.assign(_launch, {
      flightNumber,
      upcoming: true,
    })
  );
}

module.exports = {
  getAllLaunches,
  addNewLaunches,
};
