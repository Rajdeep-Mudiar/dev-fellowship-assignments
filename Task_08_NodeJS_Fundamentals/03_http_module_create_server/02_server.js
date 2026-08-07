import http from "http";

const PORT = 8000;

const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log(req.method);
  res.setHeader("Content-Type", "text/html");
  res.statusCode = 404;
  res.end("<h1> My name is Rajdeep </h1>");
});

server.listen(PORT, () => {
  console.log(`Sever is running on port ${PORT}`);
});
