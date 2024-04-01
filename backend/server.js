const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    console.log(`Forking a new worker...`);
    cluster.fork();
  });
} else {
  const app = require('./app');

  app.listen(process.env.PORT, () => {
    console.log(`Worker ${process.pid} is running on http://localhost:${process.env.PORT}`);
  });

  process.on('uncaughtException', (err) => {
    console.error(`Worker ${process.pid} encountered an uncaught exception:`, err);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error(`Worker ${process.pid} encountered an unhandled rejection at:`, promise, 'reason:', reason);
    process.exit(1);
  });
}
