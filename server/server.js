const express = require("express");
const cors = require("cors");
const path = require("path");
const { getOneJustRental, getOneRentalAndDates } = require('./db/controller.js');

var app = express();

app.use(cors());
app.use(express.static(path.resolve(__dirname, "../public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/rentals", (req, res) => {
  const id = parseInt(req.query.id);
  getOneRentalAndDates(id)
    .then(result => {
      if (result === null) {
        res.status(404).send('could not find listing with that id');
      } else {
        res.json(result);
      }
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.delete("/api/rentals", (req, res) => {
  const id = parseInt(req.query.id);
  res.send('not currently implemented');
});

app.post("/api/rentals", (req, res) => {
  const newRental = req.body;
  console.log(newRental);
  res.send('not currently implemented');
  // body needs the pieces, call controller update
});

app.put("/api/rentals", (req, res) => {
  const id = parseInt(req.query.id);
  const update = req.body;
  res.send('not currently implemented');
});

app.get("/app.js", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/bundle.js"));
});

app.listen(3003, err => {
  console.log("Listening on port 3003...");
});
