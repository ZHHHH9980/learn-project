const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");
const { loadPlanets } = require("./model/planets.model");
const { loadLaunchesData } = require("./model/launches.model");

const PORT = 8000 || process.env.PORT;
const server = http.createServer(app);

const MONGO_URL =
  "mongodb+srv://howzhongzh:3bxOI0bS0ye1FKGV@nasaproject.bfxq00h.mongodb.net/?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
  console.log("Mongodb connection ready!");
});

async function startServer() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    autoIndex: true,
  });

  await loadPlanets();
  await loadLaunchesData();

  server.listen(PORT, () => {
    console.log(`server start in ${PORT}`);
  });
}

startServer();
