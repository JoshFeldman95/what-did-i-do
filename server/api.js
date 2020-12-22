/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");
const { Op } = require("sequelize");

// import models so we can interact with the database
const { User, Response } = require("./models");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socket = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  console.log("GET /whoami");
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socket.addUser(req.user, socket.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// /responses
router.get("/responses", (req, res) => {
  console.log("GET /responses");
  Response.findAll({
    where: {
      date: req.query.date,
      userId: req.query.userId,
    },
  })
    .then((responses) => {
      console.log(responses);
      const responseIDs = responses.map((ans) => ans.id);
      responseIDs.sort();
      res.send({ responseIDs: responseIDs });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/responses", auth.ensureLoggedIn, (req, res) => {
  console.log("POST /responses");
  Response.create({ date: req.body.date, response: "", userId: req.body.userId }).then(
    (newResponse) => {
      res.send({ responseID: newResponse.id });
    }
  );
});

router.delete("/responses", (req, res) => {
  console.log("DELETE /responses");
  Response.destroy({ where: { id: { [Op.in]: req.body.responseIDs } } }).then((out) => {
    res.send({ responseID: req.body.responseIDs });
  });
});

// /response/text
router.get("/response/text", (req, res) => {
  console.log("GET /response/text");
  Response.findOne({
    where: { id: parseInt(req.query.responseID) },
  }).then((responseObj) => {
    res.send({ text: responseObj.text });
  });
});

router.put("/response/text", (req, res) => {
  console.log("PUT /response/text");
  Response.findOne({
    where: { id: req.body.responseID },
  })
    .then((responseObj) => {
      responseObj.text = req.body.text;
      responseObj.save();
      res.send({ text: req.body.text });
    })
    .catch(() => {
      console.log(`no response with id ${req.body.responseID}`);
    });
});

// auth

router.get("/user", (req, res) => {
  User.findById(req.query.userId).then((user) => {
    res.send(user);
  });
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
