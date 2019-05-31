const router = require("express").Router();
const myApiRouter = require("../controllers/address");

router.get("/", (req, res) => {
    const result = myApiRouter.allAddresses(req, res);
    return result;
});

router.get('/api', (req, res) => {
    res.sendFile(path.join(__dirname, '/inc/convertedAirports.json'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/inc/convertedAirports.json'));
});

module.exports = router;