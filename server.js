const express = require('express');
const serveStatic = require("serve-static")
const cors = require('cors')

const path = require('path');
app = express();
app.use(cors())
app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 3000;
app.listen(port);


var proxy = require('express-http-proxy');
var app = require('express')();
 


