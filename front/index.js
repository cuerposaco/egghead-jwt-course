const express = require("express")
const bodyParser = require("body-parser")

const app = express()
const PORT = process.env.PORT || 4321

app.get("/", (req, res) => {
  res
    .status(200)
    .sendFile(__dirname + "/templates/index.html")
})


app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`)
})