# Stranger Things Alphabet Wall

Arduino Nano source code for controlling WS2811 light strip is located in `/strangerThings`. Uses port 6 for data line.

Node Express source code for server is located in `/server`. From that directory, run:

```
npm install
npm run start:local
```

http://localhost:1953

*Docker notes:*

    docker build -t stranger-things:0.1 .
    docker run -d -p 1983:1983 -p 3891:3891 --name stranger-things stranger-things:0.1