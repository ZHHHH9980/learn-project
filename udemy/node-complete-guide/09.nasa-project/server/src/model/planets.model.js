const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");
const planets = require("./planets.mongo");

function isHabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}

function loadPlanets() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "data", "059-kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitablePlanet(data)) {
          await savePlanet(data);
        }
      })
      .on("error", (err) => {
        console.log("err", err);
      })
      .on("end", async () => {
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(`${countPlanetsFound}: planets found`);
        resolve();
      });
  });
}

function getAllPlanets() {
  // find all plantes from mongo
  return planets.find({});
}

async function savePlanet(data) {
  try {
    // upsert = insert + update
    await planets.updateOne(
      // check if is existed
      {
        keplerName: data.kepler_name,
      },
      // if no exist, insert with this object
      {
        keplerName: data.kepler_name,
      },
      // if exist, update with above object
      {
        upsert: true,
      }
    );
  } catch (err) {
    console.log("err", err);
  }
}

module.exports = {
  loadPlanets,
  getAllPlanets,
};
