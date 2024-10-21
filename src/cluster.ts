import cluster from 'cluster';
import os from 'os';
import app from './index';
import dotenv from 'dotenv';
import http from "http";

dotenv.config();

const numCPUs = os.cpus().length;
const PORT = Number(process.env.PORT) || 4000;

const createProxyRequest = (
    request: http.IncomingMessage,
    response: http.ServerResponse,
    port: number
  ) => {
    const proxyReq = http.request(
      {
        hostname: 'localhost',
        port,
        path: request.url,
        method: request.method,
        headers: request.headers,
      },
      (proxyRes) => {
        response.writeHead(proxyRes.statusCode!, proxyRes.headers);
        proxyRes.pipe(response);
        console.log(`Operation completed on Worker: ${process.pid}, Port: ${port}`);
      }
    );
  
    request.pipe(proxyReq);
};

if (cluster.isMaster) {
  for (let i = 0; i < numCPUs - 1; i++) {
    cluster.fork({ PORT: PORT + i + 1 });
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });

  let currentIndex = 0;
  const targets: number[] = [];
  for (let i = 1; i < numCPUs; i++) {
    targets.push(PORT + i);
  }

  const loadBalancer = http.createServer((request, response) => {
    createProxyRequest(request, response, targets[currentIndex]);
    currentIndex = (currentIndex + 1) % targets.length;
  });

  loadBalancer.listen(PORT, () => {
    console.log(`Primary ${process.pid} running on port ${PORT}`);
  });
} else {
  app.listen(process.env.PORT, () => {
    console.log(`Worker ${process.pid} started on port ${process.env.PORT}`);
  });
}
