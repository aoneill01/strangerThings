const path = require("path");
const express = require("express");
const SerialPort = require("serialport");

const app = express();
const port = 1983;
let sp;

SerialPort.list().then(ports => {
    const path = ports
        .map(p => p.comName)
        .find(comName => comName.includes("usbserial"));
    if (path) {
        sp = new SerialPort(path);
    }
    else {
        console.error("No serial port found");
    }
});

app.use(express.json());

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.post("/blink", (req, res) => {
    console.log(req.body);
    if (sp) sp.write(req.body.message);
    else console.log("No serial port found");
    res.send("done");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
