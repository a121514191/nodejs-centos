var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var fileAsBase64Src = require("base64-image!./img/9skin.png");
const { spawn,exec,execFile } = require('child_process');

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle,exec,fileAsBase64Src); //執行server.js 的 start