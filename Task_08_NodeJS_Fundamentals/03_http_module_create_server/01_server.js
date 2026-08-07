import http from "http";

const PORT = 8000;

const server = http.createServer((req, res) => {
  res.write("Hello Rajdeep");
  res.end();
});

server.listen(PORT, () => {
  console.log(`Sever is running on port ${PORT}`);
});
