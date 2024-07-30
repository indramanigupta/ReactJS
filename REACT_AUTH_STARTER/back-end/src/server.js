import express from "express";
import { routes } from "./routes";
import { initializeDbConnection } from "./db";

/* const https = require("https");
const fs = require("fs");
const path = require("path"); */

const PORT = process.env.PORT || 8080;

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// This allows us to access the body of POST/PUT
// requests in our route handlers (as req.body)
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

// Path to your SSL certificates
/* const privateKey = fs.readFileSync(path.join(__dirname, "key.pem"), "utf8");
const certificate = fs.readFileSync(path.join(__dirname, "cert.pem"), "utf8");

const credentials = { key: privateKey, cert: certificate }; */

app.get("/", (req, res) => {
  res.send("Hello, HTTPS world!");
});

// Create HTTPS server
//const httpsServer = https.createServer(credentials, app);

// Listen on port 443 (default port for HTTPS)
/* httpsServer.listen(443, () => {
  console.log("HTTPS Server running on port 443");
}); */

// Add all the routes to our Express server
// exported from routes/index.js
routes.forEach((route) => {
  app[route.method](route.path, route.handler);
});

// Connect to the database, then start the server.
// This prevents us from having to create a new DB
// connection for every request.
initializeDbConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
