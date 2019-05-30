const express = require("express");
const path = require("path");
//const cookieParser = require("cookie-parser");
const app = express();
//const fetch = require("node-fetch");
const myApiRouter = require("./routes/route");
const cors = require("cors");

const port = 9000;

app.use(cors());
app.options("*", cors());

//app.use(cookieParser());

//app.use("/", express.static(path.join(__dirname, "/inc/convertedAirports.json")));

app.get('/', (req, res) => {
    res.send('Airports API!');
});

app.get('/api', (req, res) => {
    res.sendFile(path.join(__dirname, '/inc/convertedAirports.json'));
});

//app.use("/api", myApiRouter);

app.listen(port, function (req, res) {
    console.log('Server running on port: ' + port);
});