const express = require("express");
const cluster = require("cluster");
const os = require("os");

const app = express();
console.log("os.cpus()", os.cpus());

app.get("/", (req, res) => {
  res.send(`Ding ${process.pid}`);
});

if (cluster.isMaster) {
  console.log("Master has been started");
  cluster.fork();
  cluster.fork();
} else {
  console.log("Worker has been started");
  app.listen(3000);
}
