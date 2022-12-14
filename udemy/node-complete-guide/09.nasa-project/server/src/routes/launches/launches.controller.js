const {
  getAllLaunches,
  addNewLaunches,
} = require("../../model/launches.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

function httpAddNewLaunches(req, res) {
  const launch = req.body;
  addNewLaunches(launch);

  return res.status(201).json(launch);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunches,
};
