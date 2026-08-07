import http from "http";

const PORT = process.env.port;

const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log(req.method);
  res.writeHead(500, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Server Error" }));
});

server.listen(PORT, () => {
  console.log(`Sever is running on port ${PORT}`);
});
