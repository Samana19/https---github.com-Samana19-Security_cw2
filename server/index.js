const app = require('../server/app')

const express = require("express");
const https = require("https");
const path = require("path");
const fs = require("fs");

const key = fs.readFileSync('./key.pem');
const cert = fs.readFileSync('./cert.pem');
const server = https.createServer({ key, cert }, app);

const port = process.env.PORT

app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
})
