const http = require("http");
const fs = require("node:fs");

http
  .createServer((req, res) => {
    let url = req.url;
    let fileName = "index.html"; //Default

    if (url === "/") {
      fileName = "index.html";
    } else if (url === "/about") {
      fileName = "about.html";
    } else if (url === "/contact-me") {
      fileName = "contact-me.html";
    } else fileName = "404.html";

    fs.readFile(fileName, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("Page Not found");
      }

      //Throws 404 error whenever url is not among the mentioned above
      if (fileName === "404.html") {
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end(data);
      }

      res.writeHead(200, { "Content-Type": "text/html" });
      console.log(data);
      res.write(data);
      res.end();
    });
  })
  .listen(8080);
