const isLocal = process.env.IS_LOCAL !== undefined;

const path = require("path");
const net = require("net");
const express = require("express");

const app = express();
const port = 1983;
let sp;
let sock;

if (isLocal) {
    const SerialPort = require("serialport");

    SerialPort.list().then(ports => {
        const path = ports
            .map(p => p.comName)
            .find(comName => comName.includes("usbserial"));
        if (path) {
            sp = new SerialPort(path);
        } else {
            console.error("No serial port found");
        }
    });
} else {
    const server = net.createServer(function(socket) {
        socket.setEncoding("utf8");

        socket.on("data", data => {
            console.log("Received " + data);

            if (data !== "no cherry no deal") {
                socket.destroy();
                return;
            }

            sock = socket;
        });
    });

    server.listen(3891);
}

app.use(express.json());

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.post("/blink", (req, res) => {
    console.log(req.body);
    if (isLocal) {
        if (sp) sp.write(req.body.message);
        else console.log("No serial port found");
    } else {
        if (sock) sock.write(req.body.message);
        else console.log("No connection");
    }
    res.send("done");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
