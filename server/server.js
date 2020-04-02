const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const Rental = require("./db/Rental.js");

mongoose.connect("mongodb://localhost:27017/airbnb", { useNewUrlParser: true, useUnifiedTopology: true });

var app = express();

app.use(cors());
app.use(express.static(path.resolve(__dirname, "../public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/rentals", (req, res) => {
  const id = parseInt(req.query.id);
  Rental.findOne({ _id: id })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.delete("/api/rentals", (req, res) => {
  const id = parseInt(req.query.id);

  Rental.deleteOne({ _id: id })
    .then(result => {
      let message;
      if (result.deletedCount === 0) {
        message = `No rental id ${id} to delete`;
      } else {
        message = `Rental id ${id} deleted`
      }
      res.status(200).send(message);
    })
    .catch(err => {
      console.error(err);
      res.status(400).send(`Unable to delete rentals id ${id}`);
    });
});

app.post("/api/rentals", (req, res) => {
  const newRental = req.body;

  Rental.find({})
    .sort({_id: -1})
    .limit(1)
    .then(lastRental => {
      newRental._id = lastRental[0]._id + 1;
      Rental.create(newRental)
    })
    .then(results => {
      res.status(200).send('New Rental added');
    })
    .catch(err => {
      console.error(err);
      res.status(400).send('Unable to add new rental');
    });
});

app.put("/api/rentals", (req, res) => {
  const id = parseInt(req.query.id);
  const update = req.body;

  Rental.findOneAndUpdate({ _id: id }, update)
    .then(result => {
      console.log('successful update', result);
      res.json(result);
    })
    .catch(err => {
      console.error(err);
      res.status(400).send(err);
    });
});

// app.get("/app.js", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../public/bundle.js"));
// });

app.listen(3003, err => {
  console.log("Listening on port 3003...");
});