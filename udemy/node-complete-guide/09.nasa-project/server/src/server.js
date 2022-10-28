const http = require('http');
const app = require('./app');
const { loadPlanets } = require('./model/planets.model');
const PORT = 8000 || process.env.PORT;

const server = http.createServer(app);

async function startServer() {
  await loadPlanets();

  server.listen(PORT, () => {
    console.log(`server start in ${PORT}`);
  });
}

startServer();
