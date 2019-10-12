const path = require("path");
const express = require("express");
const SerialPort = require("serialport");

const app = express();
const port = 1983;
const sp = new SerialPort("/dev/tty.usbserial-14110");

app.use(express.json());

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.post("/blink", (req, res) => {
    console.log(req.body);
    sp.write(req.body.message);
    res.send("done");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
