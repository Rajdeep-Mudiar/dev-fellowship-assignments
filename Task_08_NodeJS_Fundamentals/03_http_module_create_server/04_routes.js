import http from "http";

const PORT = 8000;

const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log(req.method);

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1> My name is Rajdeep </h1>");
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1> About Section</h1>");
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1> Not Found</h1>");
  }
});

server.listen(PORT, () => {
  console.log(`Sever is running on port ${PORT}`);
});
