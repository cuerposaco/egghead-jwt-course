const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const jwt = require('jsonwebtoken')
const expressjwt = require('express-jwt');

const PORT = process.env.API_PORT || 8888;
const users = [
  { id: 1, username: "admin", password: "admin"},
  { id: 2, username: "guest", password: "guest"},
];
const checkJWT = expressjwt({
  secret: 'mysupersecretKEY',
})

// Server
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/status", (req, res) => {
  const localTime = (new Date()).toLocaleTimeString();
  res.status(200).send(`Server time is ${localTime}.`);
});

app.get("/resource", (req, res) => {
  res.status(200).send('Public resource, you can see this');
});

app.get("/resource/secret", checkJWT, (req, res) => {
  res.status(200).send('Secret resource, you should be logged in to see this');
});

app.post("/login", (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send('You need a username and password');
    return;
  }

  const user = users.find(u => {
    return u.username === req.body.username && u.password === req.body.password
  });

  if (!user) {
    res.status(401).send('User not found');
    return;
  }

  const token = jwt.sign({
    sub: user.id,
    username: user.username,
  }, "mysupersecretKEY", { expiresIn : "3 hours"});
  
  res.status(200).send({ access_token: token })

});

app.get("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`)
});