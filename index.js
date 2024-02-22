const express = require('express');
require("dotenv").config();
const { UserController } = require("./src/controller/users");
const { initializeRedisClient, redisCachingMiddleware } = require("./src/middleware/redis");
// const { redisCachingMiddleware } = require("./src/middleware/redis");
//initialse express app

async function initializeExpressServer() {
    const app = express();
    await initializeRedisClient();
    app.use(express.json());
    app.get("/api/v1/users", redisCachingMiddleware(), UserController.getAll);

    app.use('/', (req, res) => {
        res.send('Hello, world!');
    })
    app.listen(9000, function () {
        console.log("Listening on port 9000")
    });
}

initializeExpressServer()
.then()
.catch( (e) => console.error(e));








