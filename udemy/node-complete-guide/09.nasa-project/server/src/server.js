const http = require('http');
const app = require('./app');
const { loadPlanets } = require('./model/planets.model');
const PORT = 5005 || process.env.PORT;

const server = http.createServer(app);

async function startServer() {
  console.log('111', 111);
  await loadPlanets();

  server.listen(PORT, () => {
    console.log(`server start in ${PORT}`);
  });
}

startServer();
