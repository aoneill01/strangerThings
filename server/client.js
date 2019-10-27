const http = require("http");
const net = require("net");

const client = new net.Socket();
client.connect(3891, process.argv[2], () => {
    console.log("Connected");
    client.write("no cherry no deal");
});

client.setEncoding("utf8");

client.on("data", data => {
    console.log("Received " + data);
    const payload = JSON.stringify({ message: data });
    const req = http.request({
        method: "POST",
        hostname: "localhost",
        port: 1983,
        path: "/blink",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": payload.length
        }
    });
    req.write(payload);
});

client.on("end", () => {
    console.log("Disconnected");
});
