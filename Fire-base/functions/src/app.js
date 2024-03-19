const Koa = require("koa");
const app = new Koa();
const bodyParser = require("koa-bodyparser");
const router = require("./routes.js");
const cors = require("@koa/cors");

app.use(cors());
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());

module.exports = app;
