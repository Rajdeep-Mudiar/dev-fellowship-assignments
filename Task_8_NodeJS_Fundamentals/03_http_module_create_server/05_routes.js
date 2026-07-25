import http from "http";

const PORT = 8000;

const server = http.createServer((req, res) => {
  console.log(req.url);
  console.log(req.method);

  try {
    if (req.method === "GET") {
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
    } else {
      throw new Error("Method not allowed");
    }
  } catch (error) {
    // 500 is server error
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Server Error");
  }
});

server.listen(PORT, () => {
  console.log(`Sever is running on port ${PORT}`);
});
