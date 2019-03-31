const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const expressjwt = require('express-jwt');

const PORT = process.env.API_PORT || 8888;
const checkJWT = expressjwt({
  secret: 'mysupersecretKEY',
})

// Server
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/resource", (req, res) => {
  res.status(200).send('Public resource, you can see this');
});

app.get("/resource/secret", checkJWT, (req, res) => {
  res.status(200).send('Secret resource, you should be logged in to see this');
});

app.get("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`API Server listening on PORT ${PORT}`)
});