const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;

var page_countor = 0; // Ò³Ãæ¼ÆÊýÆ÷

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('' + page_countor);
  page_countor += 1;
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});