require("dotenv").config();
const express = require("express");
const cors = require("cors");

const port = 3001;

const app = express();
const connection = require("./conf");
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.static("public"));
app.use(cors());

// Add headers
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");
  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
  // Pass to next layer of middleware
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/players", (req, res) => {
  connection.query(
    `SELECT players.id, name,firstname,shirt_number,poste_name,photo
      FROM players JOIN poste ON players.poste_id = poste.id`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).json(result);
      }
    }
  );
});

app.get("/players/:id", (req, res) => {
  const playerId = req.params.id;
  connection.query(
    `SELECT players.id, name,firstname,shirt_number,poste_name,photo, birthdate, nationality, height
      FROM players JOIN poste ON players.poste_id = poste.id WHERE players.id = ${playerId}`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).json(result);
      }
    }
  );
});

app.get("/search/:request", (req, res) => {
  const search = req.params.request;
  connection.query(
    `SELECT players.id, name,firstname,shirt_number,poste_name,photo
      FROM players JOIN poste ON players.poste_id = poste.id WHERE name LIKE "%${search}%"`,
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      } else {
        res.status(200).json(result);
      }
    }
  );
});

app.listen(port, err => {
  if (err) {
    throw new Error("Something Bad Happened ...");
  }
  console.log(`server is listening on ${port}`);
});
