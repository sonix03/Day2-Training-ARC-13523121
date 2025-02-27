const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, "public");

const serveStaticFile = (res, filePath, contentType) => {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("404 Not Found");
        } else {
            res.writeHead(200, { "Content-Type": contentType });
            res.end(data);
        }
    });
};

const server = http.createServer((req, res) => {
    console.log(`Request: ${req.url}`);

    if (req.url === "/") {
        serveStaticFile(res, path.join(PUBLIC_DIR, "index.html"), "text/html");
    } else if (req.url === "/style.css") {
        serveStaticFile(res, path.join(PUBLIC_DIR, "style.css"), "text/css");
    } else if (req.url === "/script.js") {
        serveStaticFile(res, path.join(PUBLIC_DIR, "script.js"), "application/javascript");
    } else if (req.url === "/api/products") {
        fetch("https://dummyjson.com/products")
            .then(response => response.json())
            .then(data => {
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(JSON.stringify(data));
            })
            .catch(error => {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("Error fetching data");
            });
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
