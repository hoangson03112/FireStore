const functions = require("firebase-functions");
const app = require("./src/app.js");

exports.hello = functions.https.onRequest(app.callback());
